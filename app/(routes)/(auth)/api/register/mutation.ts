import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { register } from "@/config/endpoints";

type User = { email: string; username: string; password: string; passwordConfirm: string; plan: string };

export const useRegister = () => {
  const queryClient = useQueryClient();
  return useMutation((data: User) => axiosInstance.post(register, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([QUERY_KEYS.register]);
    },
  });
};
