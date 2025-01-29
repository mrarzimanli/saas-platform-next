import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { analyticsReels } from "@/config/endpoints";
import { ErrorResponse } from "@/shared/types/api";

export const useAnalyticsReels = () => {
  return useQuery(
    [QUERY_KEYS.analyticsReels],
    async () => {
      const { data } = await axiosInstance.get(analyticsReels);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        console.error("Analytics posts error:", error);
      },
    }
  );
};
