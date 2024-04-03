import { useQuery } from "@tanstack/react-query";
import { GetBanner } from "../../api/api";

const useGetBanners = (viewSize: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getBanners", viewSize],
    queryFn: () => GetBanner(viewSize),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetBanners;
