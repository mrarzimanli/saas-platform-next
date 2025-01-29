import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { analyticsPerformances } from "@/config/endpoints";
import { ErrorResponse } from "@/shared/types/api";

export const useAnalyticsPerformances = () => {
  return useQuery(
    [QUERY_KEYS.analyticsPerformances],
    async () => {
      const { data } = await axiosInstance.get(analyticsPerformances);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        console.error("Analytics posts error:", error);
      },
    }
  );
};
