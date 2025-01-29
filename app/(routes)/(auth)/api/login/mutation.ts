import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosOpen } from "@/config/axiosInstance";
import { login } from "@/config/endpoints";
import { LoginRequest } from "../../shared/types/api";
import { ErrorResponse } from "@/shared/types/api";

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: LoginRequest) => {
      const response = await axiosOpen.post(login, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.login]);
      },
      onError: (error: ErrorResponse) => {
        console.error("Login error:", error);
      },
    }
  );
};
