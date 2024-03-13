import { useQuery } from "@tanstack/react-query";
import { GetCountries } from "../../api/api";

const useGetCountries = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getCountries"],
    queryFn: GetCountries,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetCountries;
