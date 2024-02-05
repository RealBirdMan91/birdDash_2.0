"use server";

import { LoginSchema, TLoginSchema } from "@/schemas/auth";
import { ActionResponseType } from "@/types/response";
import { ZodError } from "zod";
import { signIn } from "@/auth";
import { getUserByEmail } from "@/data/user";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";

export async function login({
  email,
}: TLoginSchema): Promise<ActionResponseType> {
  try {
    LoginSchema.parse({ email });

    const user = await getUserByEmail(email);
    if (!user) {
      return { type: "error", message: "login just for invited users" };
    }

    await signIn("email", {
      email,
      redirect: false,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });

    return { type: "success", message: "An email send to the user" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { type: "error", message: error.issues[0].message };
    }
    if (error instanceof AuthError) {
      return {
        type: "error",
        message: "An Auth Error occured, please contact your admin",
      };
    }
    return {
      type: "error",
      message: "unknown error occured, please try again later",
    };
  }
}
