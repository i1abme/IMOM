import { useQuery } from "@tanstack/react-query";
import { GetPackageNames } from "../../api/api";

const useGetPackageName = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getPackageNames"],
    queryFn: GetPackageNames,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};
export default useGetPackageName;
