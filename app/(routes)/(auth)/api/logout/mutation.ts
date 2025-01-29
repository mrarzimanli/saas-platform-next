import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { logout } from "@/config/endpoints";
import { ErrorResponse } from "@/shared/types/api";

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: null) => {
      const response = await axiosInstance.post(logout, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.logout]);
      },
      onError: (error: ErrorResponse) => {
        console.error("Logout error:", error);
      },
    }
  );
};
