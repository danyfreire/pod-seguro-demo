import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.delivery.upsert({
    where: { trackingNumber: "GUIA-DEMO-001" },
    update: {},
    create: {
      trackingNumber: "GUIA-DEMO-001",
      recipientName: "Juan Pérez",
      recipientEmail: "demo@example.com",
      deliveryAddress: "Av. República 123, Quito",
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
