import { useQuery } from "@tanstack/react-query";
import { GetTags } from "../../api/api";

const useGetTags = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getTags"],
    queryFn: GetTags,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetTags;
