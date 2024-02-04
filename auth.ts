import type { NextAuthConfig, Session } from "next-auth";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle/schema";
import { Resend } from "resend";
import { getUserById } from "./data/user";

const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);

export const authConfig = {
  adapter: DrizzleAdapter(db),
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, //30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  providers: [
    {
      id: "email",
      type: "email",
      from: process.env.EMAIL_FROM!,
      server: {},
      maxAge: 24 * 60 * 60,
      name: "Email",
      options: {},
      sendVerificationRequest: (params) => {
        (async function () {
          const confirmURL = `${process.env.NEXT_URL}/auth/verify-request?token=${params.token}`;
          await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: [params.identifier],
            subject: "Hello World",
            html: `<a href="${confirmURL}">signin</a>`,
          });
        })();
      },
    },
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.id) return false;
      const existingUser = await getUserById(user.id);
      if (!existingUser) return false;

      return true;
    },
    //@ts-ignore
    async session({ session, user }) {
      const dbUser = await getUserById(user.id);

      if (!session.user || !dbUser)
        throw new Error("Auth Error: User not found");

      session.user.id = user.id;
      session.user.role = dbUser.role as Session["user"]["role"];

      return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
