import { useQuery } from "@tanstack/react-query";
import { GetUserInfo } from "../../api/api";

const useGetUserInfo = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getUserInfo"],
    queryFn: GetUserInfo,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};
export default useGetUserInfo;
