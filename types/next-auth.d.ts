import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: "student" | "employee" | "admin";
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
