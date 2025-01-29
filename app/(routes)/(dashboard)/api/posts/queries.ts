import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { analyticsPosts } from "@/config/endpoints";
import { ErrorResponse } from "@/shared/types/api";

export const useAnalyticsPosts = () => {
  return useQuery(
    [QUERY_KEYS.analyticsPosts],
    async () => {
      const { data } = await axiosInstance.get(analyticsPosts);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        console.error("Analytics posts error:", error);
      },

      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 0,
    }
  );
};
