import { useQuery } from "@tanstack/react-query";
import { GetMainPosts } from "../../api/api";

const useGetMainPosts = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["getMainPosts"],
    queryFn: GetMainPosts,
    refetchOnWindowFocus: false,
    retry: false,
  });
  return { data, isPending, isError, error };
};

export default useGetMainPosts;
