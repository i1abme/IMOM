import { useQueries } from "@tanstack/react-query";
import { GetPaymentInfo } from "../../api/api";

const useGetPaymentInfo = (idList: string[]) => {
  const queryResults = useQueries({
    queries: idList.map((id) => ({
      queryKey: ["getPaymentInfo", id],
      queryFn: () => GetPaymentInfo(id),
    })),
  });

  const isPending = queryResults.some((result) => result.isLoading);
  const isError = queryResults.some((result) => result.isError);
  const errors = queryResults
    .map((result) => result.error)
    .filter((error) => error != null);
  const data = queryResults
    .map((result) => result.data)
    .filter((data) => data != null);

  return { data, isPending, isError, errors };
};
export default useGetPaymentInfo;
