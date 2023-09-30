import { hash } from "argon2";
import { PrismaClient } from "../src/generated/prisma-client.ts";

async function seed() {
  console.info("Seeding database...");
  const prisma = new PrismaClient();

  try {
    const fullName = "Admin NekoToko";
    const username = "admin";
    const password = await hash("nekotoko");

    console.info("Seeding default admin user");

    const user = {
      full_name: fullName,
      username,
      password,
      roles: ["admin"]
    };

    await prisma.user.upsert({
      where: { username: user.username },
      create: { ...user },
      update: { ...user }
    });

    console.info("Seeded database successfully");
  } catch (err) {
    console.error("Seeding database failed!");
    console.error(err);
  } finally {
    void prisma.$disconnect();
  }
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
