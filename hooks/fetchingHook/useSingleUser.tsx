import { queryKeys } from "@/utils/queryKeys/queryKeys";
import { useFetch } from "../useFetchApi/useFetchApi";

const useSingleUser = () => {
  const { response, isLoading } = useFetch(
    [queryKeys.get_single_user],
    "/api/user/me",
    {
      staleTime: Infinity,
    }
  );
  return {
    response,
    isLoading,
  };
};

export default useSingleUser;
