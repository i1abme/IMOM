import { useQuery } from "@tanstack/react-query";
import { GetProductDates } from "../../api/api";

const useGetProductDates = (id: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getProductDates"],
    queryFn: () => GetProductDates(id),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetProductDates;
