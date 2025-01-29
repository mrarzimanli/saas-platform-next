import { useQueries } from "react-query";
import { axiosInstance } from "@/config/axiosInstance";
import { QUERY_KEYS } from "@/config/query-keys";
import { analyticsPerformances, analyticsPosts, analyticsReels, audienceByGender, audienceByAge, audienceByCountries, audienceByCities } from "@/config/endpoints";

// Fetch functions
const fetchPosts = async () => {
  const { data } = await axiosInstance.get(analyticsPosts);
  return data;
};

const fetchReels = async () => {
  const { data } = await axiosInstance.get(analyticsReels);
  return data;
};

const fetchPerformances = async () => {
  const { data } = await axiosInstance.get(analyticsPerformances);
  return data;
};

const fetchAudienceByGender = async () => {
  const { data } = await axiosInstance.get(audienceByGender);
  return data;
};

const fetchAudienceByAge = async () => {
  const { data } = await axiosInstance.get(audienceByAge);
  return data;
};

const fetchAudienceByCountries = async () => {
  const { data } = await axiosInstance.get(audienceByCountries);
  return data;
};

const fetchAudienceByCities = async () => {
  const { data } = await axiosInstance.get(audienceByCities);
  return data;
};

export const useAnalytics = (features: string[]) => {
  const queries = [
    {
      queryKey: [`${QUERY_KEYS.innerAnalyticsPosts}`],
      queryFn: fetchPosts,
      enabled: features.includes("posts"),
    },
    {
      queryKey: [`${QUERY_KEYS.innerAnalyticsReels}`],
      queryFn: fetchReels,
      enabled: features.includes("reels"),
    },
    {
      queryKey: [`${QUERY_KEYS.innerAnalyticsPerformances}`],
      queryFn: fetchPerformances,
      enabled: features.includes("performances"),
    },
    {
      queryKey: [`${QUERY_KEYS.innerAudienceByGender}`],
      queryFn: fetchAudienceByGender,
      enabled: features.includes("audienceByGender"),
    },
    {
      queryKey: [`${QUERY_KEYS.innerAudienceByAge}`],
      queryFn: fetchAudienceByAge,
      enabled: features.includes("audienceByAge"),
    },
    {
      queryKey: [`${QUERY_KEYS.innerAudienceByCountries}`],
      queryFn: fetchAudienceByCountries,
      enabled: features.includes("audienceByCountries"),
    },
    {
      queryKey: [`${QUERY_KEYS.innerAudienceByCities}`],
      queryFn: fetchAudienceByCities,
      enabled: features.includes("audienceByCities"),
    },
  ];

  return useQueries(queries);
};
