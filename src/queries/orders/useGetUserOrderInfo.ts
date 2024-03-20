import { useQuery } from "@tanstack/react-query";
import { GetUserOrderDetail } from "../../api/api";

const useGetUserOrderInfo = (id: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getUserOrderDetail"],
    queryFn: () => GetUserOrderDetail(id),
    refetchOnWindowFocus: false,
    retry: false,
    enabled: id !== "",
  });
  return { data, isPending, isError, error };
};
export default useGetUserOrderInfo;
