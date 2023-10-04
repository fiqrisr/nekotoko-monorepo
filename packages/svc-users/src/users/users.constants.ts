import { Prisma } from "@/generated/prisma-client.ts";

export const DEFAULT_USER_SELECT: Prisma.UserSelect = {
  id: true,
  username: true,
  full_name: true,
  roles: true,
  created_at: true,
  updated_at: true
};
