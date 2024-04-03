import { useQuery } from "@tanstack/react-query";
import { GetCountryImg } from "../../api/api";

const useGetCountryImg = (country: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getCountryImg", country],
    queryFn: () => GetCountryImg(country),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetCountryImg;
