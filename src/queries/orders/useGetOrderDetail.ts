import { useQuery } from "@tanstack/react-query";
import { GetOrderDetail } from "../../api/api";

const useGetOrderDetail = (orderId: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getOrderDetail"],
    queryFn: () => GetOrderDetail(orderId),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: orderId !== "",
  });
  return { data, isPending, isError, error };
};
export default useGetOrderDetail;
