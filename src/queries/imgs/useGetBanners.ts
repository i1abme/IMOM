import { useQuery } from "@tanstack/react-query";
import { GetBanner } from "../../api/api";

const useGetBanners = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getBanners"],
    queryFn: GetBanner,
    refetchOnWindowFocus: false,
    retry: false,
    gcTime: Infinity,
    staleTime: Infinity,
  });
  return { data, isPending, isError, error };
};

export default useGetBanners;
