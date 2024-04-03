import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostDeposit } from "../../api/api";
import { PaymentData } from "../../types/payment";
import { useState } from "react";

const usePostDeposit = (req: PaymentData | null, payFor: string | null) => {
  const queryClient = useQueryClient();
  const [errorReason, setErrorReason] = useState<string | null>(null);
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["postDeposit"],
    mutationFn: () => PostDeposit(req, payFor),
    retry: false,
    onSuccess: (data) => {
      queryClient.setQueryData(["postDeposit"], data);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const message = error?.response?.data?.message || error.message;
      setErrorReason(message);
    },
  });
  return { mutate, data, isPending, isError, error, errorReason };
};

export default usePostDeposit;
