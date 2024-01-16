import { useQuery } from "@tanstack/react-query";

import axios from "axios";

export type fetchApiType = {
  queryKey: string;
  path: string;
};
export function useFetch(queryKey: string[], path: string, config = {}) {
  const fetchData = async () => {
    const { data } = await axios.get(path, {});

    return data?.data;
  };

  const { data, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: fetchData,
    refetchOnWindowFocus: false,
    ...config,
  });
  const response = data;

  return { response, isLoading };
}
