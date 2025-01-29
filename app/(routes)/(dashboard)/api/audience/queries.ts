import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { audienceByAge, audienceByCountries, audienceByGender } from "@/config/endpoints";
import { ErrorResponse } from "@/shared/types/api";

export const useAudienceByGender = () => {
  return useQuery(
    [QUERY_KEYS.audienceByGender],
    async () => {
      const { data } = await axiosInstance.get(audienceByGender);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        console.error("Audience by gender error:", error);
      },
    }
  );
};

export const useAudienceByAge = () => {
  return useQuery(
    [QUERY_KEYS.audienceByAge],
    async () => {
      const { data } = await axiosInstance.get(audienceByAge);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        console.error("Audience by age error:", error);
      },
    }
  );
};

export const useAudienceByCountries = () => {
  return useQuery(
    [QUERY_KEYS.audienceByCountries],
    async () => {
      const { data } = await axiosInstance.get(audienceByCountries);
      return data.data;
    },
    {
      onError: (error: ErrorResponse) => {
        console.error("Audience by countries error:", error);
      },
    }
  );
};
