import { queryKeys } from "@/utils/queryKeys/queryKeys";
import { useFetch } from "../useFetchApi/useFetchApi";

const useUsers = () => {
  const { isLoading, response } = useFetch([queryKeys.get_users], "/api/user");
  return { isLoading, response };
};

export default useUsers;
