import { useMutation } from "@tanstack/react-query";
import { PostManagerOrders } from "../../api/api";
import { queryClient } from "../common/quertClient";
import { OrderRequest } from "../../types/manager";

const usePostMangerOrders = (req: OrderRequest) => {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["postManagerOrders"],
    mutationFn: () => PostManagerOrders(req),
    retry: false,
    onSuccess: (data) => {
      queryClient.setQueryData(["postManagerOrders"], data);
    },
  });
  return { mutate, data, isPending, isError, error };
};

export default usePostMangerOrders;
