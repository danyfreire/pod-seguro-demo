import { NextResponse } from "next/server";
import { Resend } from "resend";
import { prisma } from "@/lib/db";
import { generateOtp, getOtpExpiry, hashOtp } from "@/lib/otp";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ tracking: string }> },
) {
  const { tracking } = await params;
  const delivery = await prisma.delivery.findUnique({ where: { trackingNumber: tracking } });

  if (!delivery) {
    return NextResponse.json({ error: "Entrega no encontrada" }, { status: 404 });
  }

  const otp = generateOtp();
  const expiresAt = getOtpExpiry();

  const otpRecord = await prisma.oTP.create({
    data: {
      deliveryId: delivery.id,
      otpHash: hashOtp(otp),
      expiresAt,
    },
  });

  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM;

  if (!from) {
    return NextResponse.json({ error: "EMAIL_FROM no configurado" }, { status: 500 });
  }

  const result = await resend.emails.send({
    from,
    to: delivery.recipientEmail,
    subject: `Código para confirmar su entrega ${delivery.trackingNumber}`,
    text: `Tu código para confirmar la recepción de la entrega ${delivery.trackingNumber} es ${otp}. Expira en ${process.env.OTP_EXPIRATION_MINUTES ?? "5"} minutos.`,
  });

  if (result.error) {
    await prisma.oTP.delete({ where: { id: otpRecord.id } });
    return NextResponse.json({ error: "No se pudo enviar el OTP" }, { status: 502 });
  }

  await prisma.$transaction([
    prisma.oTP.update({ where: { id: otpRecord.id }, data: { sentAt: new Date() } }),
    prisma.delivery.update({ where: { id: delivery.id }, data: { status: "OTP_SENT" } }),
  ]);

  return NextResponse.json({ ok: true, expiresAt });
}
