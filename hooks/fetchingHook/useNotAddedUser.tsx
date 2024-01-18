import { REQUEST_PATH, queryKeys } from "@/utils/queryKeys/queryKeys";
import { useFetch } from "../useFetchApi/useFetchApi";
import { useSession } from "next-auth/react";

const useNotAddedUsrs = () => {
  const { data } = useSession();
  const { response, isLoading } = useFetch(
    [queryKeys.get_not_added_users],
    REQUEST_PATH.not_added_user,
    {
      enabled: !!data,
    }
  );
  return {
    response,
    isLoading,
  };
};

export default useNotAddedUsrs;
