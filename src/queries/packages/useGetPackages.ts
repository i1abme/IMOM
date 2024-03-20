import { useQuery } from "@tanstack/react-query";
import { GetPackages } from "../../api/api";

const useGetPackages = (tagSubmit: boolean, country?: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getPackage", country],
    queryFn: () => GetPackages(country ? country : ""),
    refetchOnWindowFocus: true,
    retry: false,
    enabled: !tagSubmit,
  });
  return { data, isPending, isError, error };
};

export default useGetPackages;
