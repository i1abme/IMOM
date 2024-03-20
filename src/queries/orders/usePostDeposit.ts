import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostDeposit } from "../../api/api";
import { PaymentData } from "../../types/payment";

const usePostDeposit = (req: PaymentData) => {
  const queryClient = useQueryClient();
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
