"use server";

import { LoginSchema, TLoginSchema } from "@/schemas/auth";
import { ActionResponseType } from "@/types/response";
import { ZodError } from "zod";

export async function login({
  email,
}: TLoginSchema): Promise<ActionResponseType> {
  try {
    LoginSchema.parse({ email });

    return { type: "success", message: "An email send to the user" };
  } catch (error) {
    if (error instanceof ZodError) {
      return { type: "error", message: error.issues[0].message };
    }
    return {
      type: "error",
      message: "unknown error occured, please try again later",
    };
  }
}
