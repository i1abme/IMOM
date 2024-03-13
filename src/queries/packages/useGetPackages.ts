import { useQuery } from "@tanstack/react-query";
import { GetPackages } from "../../api/api";

const useGetPackages = (country?: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getPackage", country],
    queryFn: () => GetPackages(country ? country : ""),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetPackages;
