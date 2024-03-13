import { useMutation } from "@tanstack/react-query";
import { PostDeposit } from "../../api/api";
import { PaymentData } from "../../types/payment";
import { queryClient } from "../common/quertClient";

const usePostDeposit = (req: PaymentData) => {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["postDeposit"],
    mutationFn: () => PostDeposit(req),
    retry: false,
    onSuccess: (data) => {
      queryClient.setQueryData(["postDeposit"], data);
    },
  });
  return { mutate, data, isPending, isError, error };
};

export default usePostDeposit;
