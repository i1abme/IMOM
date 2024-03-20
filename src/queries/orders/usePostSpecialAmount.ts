import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostSpecialAmount } from "../../api/api";
import { SpecialAmountData } from "../../types/manager";

const usePostSpecialAmount = (req: SpecialAmountData) => {
  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationKey: ["postSpecialAmount"],
    mutationFn: () => PostSpecialAmount(req),
    retry: false,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getOrderDetail"] }),
  });
  return { mutate, isPending, isError, error };
};
export default usePostSpecialAmount;
