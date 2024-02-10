import { sql } from "@vercel/postgres";
import { drizzle } from "drizzle-orm/vercel-postgres";
import * as schema from "@/drizzle/schema";
import { eq } from "drizzle-orm";
import { users } from "@/drizzle/schema";

const db = drizzle(sql, { schema });

export async function getUserByEmail(email: string) {
  try {
    const user = await db.query.users
      .findFirst({
        where: eq(users.email, email),
      })
      .execute();
    return user;
  } catch (err) {
    return null;
  }
}

export async function getUserById(id: string) {
  try {
    const user = await db.query.users
      .findFirst({
        where: eq(users.id, id),
      })
      .execute();
    return user;
  } catch (err) {
    return null;
  }
}
