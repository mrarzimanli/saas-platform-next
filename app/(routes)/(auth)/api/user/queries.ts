import { useQuery } from "react-query";
import { QUERY_KEYS } from "@/config/query-keys";
import { axiosInstance } from "@/config/axiosInstance";
import { me } from "@/config/endpoints";

export const useMe = () => {
  return useQuery(
    [QUERY_KEYS.me],
    async () => {
      const { data } = await axiosInstance.get(me);
      return data.data;
    },
    {
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      staleTime: 0,
    }
  );
};
