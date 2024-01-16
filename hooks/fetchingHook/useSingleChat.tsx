import { queryKeys } from "@/utils/queryKeys/queryKeys";
import { useFetch } from "../useFetchApi/useFetchApi";

const useSingleChat = (id: string) => {
  const { isLoading, response } = useFetch(
    [queryKeys.get_single_chat, id],
    `/api/user/chat?chatroomId=${id}`,
    {
      enabled: !!id,
      staleTime: Infinity,
    }
  );
  return { isLoading, response };
};

export default useSingleChat;
