import { useQuery } from "@tanstack/react-query";
import { GetBanner } from "../../api/api";

const useGetBanners = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getBanners"],
    queryFn: GetBanner,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetBanners;
