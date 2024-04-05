import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PostTravelerInfo } from "../../api/api";
import { UpdateTravelerReq } from "../../types/manager";

const usePostTravelerInfo = (req: UpdateTravelerReq) => {
  const queryClient = useQueryClient();
  const { mutate, isError, error } = useMutation({
    mutationKey: ["postTravelerInfo"],
    mutationFn: () => PostTravelerInfo(req),
    retry: false,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["getOrderDetail"] }),
  });
  return { mutate, isError, error };
};
export default usePostTravelerInfo;
