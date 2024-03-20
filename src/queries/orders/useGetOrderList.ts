import { useQuery } from "@tanstack/react-query";
import { GetManagerOrders } from "../../api/api";

const useGetOrderList = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getManagerOrders"],
    queryFn: () => GetManagerOrders(),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};
export default useGetOrderList;
