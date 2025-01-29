import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { plans } from "@/config/endpoints";
import { ErrorResponse } from "@/shared/types/api";

export const useListPlans = () => {
  return useQuery(
    [QUERY_KEYS.plans],
    async () => {
      const { data } = await axiosInstance.get(plans);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        console.error("Plans error:", error);
      },
    }
  );
};

export const usePlanById = (id: string | undefined) => {
  return useQuery(
    [QUERY_KEYS.planById],
    async () => {
      const { data } = await axiosInstance.get(`plans/${id}`);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        console.error("Plans error:", error);
      },
      enabled: Boolean(id),
    }
  );
};
