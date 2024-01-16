import { useMutation } from "@tanstack/react-query";
import axios from "axios";
type dataRequestType = {
  path: string;
  data: any;
};
const usePatchApi = () => {
  const patchRequest = (data: dataRequestType) => {
    return axios.patch(data.path, data.data);
  };
  const { mutate, isPending } = useMutation({
    mutationFn: patchRequest,
    mutationKey: ["delete-adding-folder"],
    onSuccess: (res) => {},
  });
  return {
    mutate,
    isPending,
  };
};

export default usePatchApi;
