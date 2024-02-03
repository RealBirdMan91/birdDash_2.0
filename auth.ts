import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle/schema";
import { Resend } from "resend";

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
          const { data, error } = await resend.emails.send({
            from: process.env.EMAIL_FROM!,
            to: [params.identifier],
            subject: "Hello World",
            html: `<a href="${params.url}">signin</a>`,
          });
          if (error) {
            return console.error({ error });
          }

          //console.log({ data });
        })();
      },
    },
  ],
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
