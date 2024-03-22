import { useQuery } from "@tanstack/react-query";
import { GetUserChildName } from "../../api/api";

const useGetUserChildName = (isLogin: boolean) => {
  const { data, isError } = useQuery({
    queryKey: ["getUserChildName"],
    queryFn: GetUserChildName,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: isLogin,
  });
  return { data, isError };
};

export default useGetUserChildName;
