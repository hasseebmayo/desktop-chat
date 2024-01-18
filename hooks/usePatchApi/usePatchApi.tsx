import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useToastify from "../useToastify/useToastify";
type dataRequestType = {
  path: string;
  data: any;
};
// This hook will be used for every Patch request
const usePatchApi = (key: string = "none ") => {
  const { errorToast, successToast } = useToastify();
  const patchRequest = (data: dataRequestType) => {
    return axios.patch(data.path, data.data);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: patchRequest,
    mutationKey: [key],
  });
  // Handling Error and Success Message here!
  function mutationFunction(
    data: dataRequestType,
    callback: (res: any) => void = () => {}
  ) {
    mutate(data, {
      onSuccess: (res: any) => {
        successToast(res?.data?.message);
        callback(res); // Call the callback function here if needed
      },
      onError: (res: any) => {
        errorToast(res?.response?.data?.message);
      },
    });
  }
  return {
    mutationFunction,
    isPending,
  };
};

export default usePatchApi;
