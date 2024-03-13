import { useMutation } from "@tanstack/react-query";
import { GetTagPackages } from "../../api/api";
import { queryClient } from "../common/quertClient";
import { TagCheckList } from "../../types/tag";

const usePostTags = (req: TagCheckList) => {
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
