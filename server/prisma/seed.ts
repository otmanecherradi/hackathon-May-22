import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    create: { name: 'Admin' },
    update: {},
  });

  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    create: { name: 'User' },
    update: {},
  });

  const hashedPassword = await bcrypt.hash('sherlock', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@prisma.io' },
    create: {
      email: 'admin@prisma.io',
      password: hashedPassword,
      fullName: 'admin user',
      roleId: adminRole.id,
    },
    update: {
      password: hashedPassword,
    },
  });

  console.log({ adminRole, admin });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
