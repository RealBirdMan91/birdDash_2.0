import { ActionResponseType } from "@/types/response";
import { useState } from "react";

type TActionMutation<T> = {
  mutationFn: (data: T) => Promise<ActionResponseType>;
};

export function useActionMutation<T>({ mutationFn }: TActionMutation<T>) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const mutate = (data: T) => {
    setIsPending(true);
    setError("");
    setSuccess("");

    mutationFn(data)
      .then((res: ActionResponseType) => {
        if (res.type === "error") {
          return setError(res.message);
        }
        setSuccess(res.message);
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return {
    isPending,
    error,
    success,
    mutate,
  };
}
