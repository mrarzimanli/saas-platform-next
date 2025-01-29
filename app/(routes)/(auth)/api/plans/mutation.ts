import { useMutation, useQueryClient } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { cancelSubscription, subscribe } from "@/config/endpoints";
import { ErrorResponse } from "@/shared/types/api";
import { CancelSubscriptionRequest, SubscribeRequest } from "@/(routes)/(dashboard)/shared/types/api";

export const useSubscribe = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: SubscribeRequest) => {
      const response = await axiosInstance.post(subscribe, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.subscribe]);
      },
      onError: (error: ErrorResponse) => {
        console.error("Subscription error:", error);
      },
    }
  );
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (data: CancelSubscriptionRequest) => {
      const response = await axiosInstance.post(cancelSubscription, data);
      return response.data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.cancelSubscription]);
      },
      onError: (error: ErrorResponse) => {
        console.error("Cancel subscription error:", error);
      },
    }
  );
};
