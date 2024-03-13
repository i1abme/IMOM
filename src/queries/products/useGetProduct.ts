import { useQuery } from "@tanstack/react-query";
import { GetProduct } from "../../api/api";

const useGetProduct = (id: number) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getProduct"],
    queryFn: () => GetProduct(id),
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetProduct;
