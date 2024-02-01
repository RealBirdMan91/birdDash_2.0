export type ActionResponseType =
  | { type: "success"; message: string }
  | { type: "error"; message: string };
