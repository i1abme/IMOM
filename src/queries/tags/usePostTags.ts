import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GetTagPackages } from "../../api/api";
import { TagCheckList } from "../../types/tag";

const usePostTags = (req: TagCheckList) => {
  const queryClient = useQueryClient();
  const { mutate, data, isPending, isError, error } = useMutation({
    mutationKey: ["postTags"],
    mutationFn: () => GetTagPackages(req),
    retry: false,
    onSuccess: (data) => {
      queryClient.setQueryData(["postTags"], data);
    },
  });
  return { mutate, data, isPending, isError, error };
};

export default usePostTags;
