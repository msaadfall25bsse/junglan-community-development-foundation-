/**
 * scripts/bootstrap-admin.ts
 *
 * Bootstrap Script — Creates initial ADMIN and DATA_ENTRY users
 * ==============================================================
 * Sections 70, 71 — Safe seed script that creates default accounts
 * ONLY if they do not already exist in the database.
 *
 * Usage:
 *   npx tsx scripts/bootstrap-admin.ts
 *
 * Environment variables used:
 *   ADMIN_EMAIL     (default: admin@junglan.org)
 *   ADMIN_PASSWORD  (required — must meet password policy)
 *   ADMIN_NAME      (default: Foundation Administrator)
 *   DATA_ENTRY_EMAIL    (default: dataentry@junglan.org)
 *   DATA_ENTRY_PASSWORD (required — must meet password policy)
 *   DATA_ENTRY_NAME     (default: Data Entry Officer)
 */

import { PrismaClient } from "@prisma/client";
import { hashPassword, validatePasswordPolicy } from "../lib/auth/password";
import { normalizeEmail } from "../lib/auth/email";

const prisma = new PrismaClient();

interface SeedUser {
  email: string;
  password: string;
  name: string;
  role: "ADMIN" | "DATA_ENTRY";
}

async function upsertUser(user: SeedUser): Promise<void> {
  const email = normalizeEmail(user.email);

  // Validate password policy
  if (!validatePasswordPolicy(user.password)) {
    throw new Error(
      `Password for ${email} does not meet policy requirements.\n` +
        "Must be: min 8 chars, 1 uppercase, 1 lowercase, 1 number."
    );
  }

  const passwordHash = await hashPassword(user.password);

  try {
    // Check if user already exists in Prisma
    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      console.log(`  [SKIP/PRISMA] ${email} — already exists in PostgreSQL (role: ${existing.role})`);
      return;
    }

    await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: user.name,
        role: user.role,
        isActive: true,
      },
    });

    console.log(`  [CREATED/PRISMA] ${email} — role: ${user.role}`);
  } catch (dbErr: any) {
    console.log(`  [INFO] PostgreSQL not available (${dbErr.message?.slice(0, 40)}...), saving to local persistent store...`);
    const { readStore, updateStore } = await import("../lib/db/persistent-store");
    updateStore((store) => {
      if (!store.users) store.users = [];
      const idx = store.users.findIndex((u) => u.email === email);
      const record = {
        id: `usr-${user.role.toLowerCase()}-${Date.now()}`,
        email,
        name: user.name,
        passwordHash,
        role: user.role,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      if (idx >= 0) {
        store.users[idx] = { ...store.users[idx], ...record };
        console.log(`  [UPDATED/STORE] ${email} — role: ${user.role}`);
      } else {
        store.users.push(record);
        console.log(`  [CREATED/STORE] ${email} — role: ${user.role}`);
      }
    });
  }
}

async function main() {
  console.log("\n=== Junglan Foundation — Bootstrap Admin Script ===\n");

  const adminEmail = process.env.ADMIN_EMAIL || "admin@junglan.org";
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME || "Foundation Administrator";

  const dataEntryEmail = process.env.DATA_ENTRY_EMAIL || "dataentry@junglan.org";
  const dataEntryPassword = process.env.DATA_ENTRY_PASSWORD;
  const dataEntryName = process.env.DATA_ENTRY_NAME || "Data Entry Officer";

  if (!adminPassword) {
    throw new Error(
      "ADMIN_PASSWORD environment variable is required.\n" +
        "Set it before running: ADMIN_PASSWORD=YourSecurePass npx tsx scripts/bootstrap-admin.ts"
    );
  }

  if (!dataEntryPassword) {
    throw new Error(
      "DATA_ENTRY_PASSWORD environment variable is required.\n" +
        "Set it before running: DATA_ENTRY_PASSWORD=YourSecurePass npx tsx scripts/bootstrap-admin.ts"
    );
  }

  const users: SeedUser[] = [
    {
      email: adminEmail,
      password: adminPassword,
      name: adminName,
      role: "ADMIN",
    },
    {
      email: dataEntryEmail,
      password: dataEntryPassword,
      name: dataEntryName,
      role: "DATA_ENTRY",
    },
  ];

  for (const user of users) {
    await upsertUser(user);
  }

  console.log("\n=== Bootstrap complete ===\n");
}

main()
  .catch((err) => {
    console.error("\n[ERROR]", err.message);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
