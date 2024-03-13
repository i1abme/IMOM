import { useMutation } from "@tanstack/react-query";
import { GetProducts } from "../../api/api";
import { ProductListRequest } from "../../types/product";

const usePostProducts = (req: ProductListRequest) => {
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["postProducts"],
    mutationFn: () => GetProducts(req),
    retry: false,
    onSuccess: (res) => res,
  });
  return { mutate, data, isPending, isError, error };
};

export default usePostProducts;
