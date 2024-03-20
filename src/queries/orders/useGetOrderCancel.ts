import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetOrderCancel } from "../../api/api";

const useGetOrderCancel = (orderId: string) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationKey: ["getOrderCancel"],
    mutationFn: () => GetOrderCancel(orderId),
    retry: false,
    onSuccess: () => {
      alert("주문이 취소되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["getOrderDetail"] });
    },
    onError: () => {
      alert("주문 취소에 실패하였습니다.");
    },
  });
  return { mutate };
};
export default useGetOrderCancel;
