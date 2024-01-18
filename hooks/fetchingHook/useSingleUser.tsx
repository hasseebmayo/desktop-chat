import { queryKeys } from "@/utils/queryKeys/queryKeys";
import { useFetch } from "../useFetchApi/useFetchApi";
import { useSession } from "next-auth/react";

const useSingleUser = () => {
  const { data: session } = useSession();
  const { response, isLoading } = useFetch(
    [queryKeys.get_single_user],
    "/api/user/me",
    {
      staleTime: Infinity,
      enabled: !!session,
    }
  );
  return {
    response,
    isLoading,
  };
};

export default useSingleUser;
