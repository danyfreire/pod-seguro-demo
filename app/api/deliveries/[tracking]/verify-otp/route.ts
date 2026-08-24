import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { verifyOtp } from "@/lib/otp";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ tracking: string }> },
) {
  const { tracking } = await params;
  const { otp } = (await request.json()) as { otp?: string };

  if (!otp || !/^\d{6}$/.test(otp)) {
    return NextResponse.json({ error: "OTP inválido" }, { status: 400 });
  }

  const delivery = await prisma.delivery.findUnique({ where: { trackingNumber: tracking } });
  if (!delivery) return NextResponse.json({ error: "Entrega no encontrada" }, { status: 404 });

  const record = await prisma.oTP.findFirst({
    where: { deliveryId: delivery.id, verifiedAt: null },
    orderBy: { createdAt: "desc" },
  });

  if (!record) return NextResponse.json({ error: "No existe un OTP activo" }, { status: 400 });
  if (record.expiresAt.getTime() < Date.now()) {
    return NextResponse.json({ error: "OTP expirado" }, { status: 410 });
  }

  const valid = verifyOtp(otp, record.otpHash);
  if (!valid) {
    await prisma.oTP.update({ where: { id: record.id }, data: { attemptCount: { increment: 1 } } });
    return NextResponse.json({ error: "OTP incorrecto" }, { status: 401 });
  }

  await prisma.$transaction([
    prisma.oTP.update({ where: { id: record.id }, data: { verifiedAt: new Date() } }),
    prisma.delivery.update({
      where: { id: delivery.id },
      data: { status: "OTP_VERIFIED", verificationMethod: "OTP_VERIFIED" },
    }),
  ]);

  return NextResponse.json({ ok: true });
}
