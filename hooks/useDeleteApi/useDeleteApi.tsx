import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useToastify from "../useToastify/useToastify";
type dataRequestType = {
  path: string;
};
type apiParams = {
  key?: string;
  showToast?: boolean;
};
// This hook will be used for every post request
const useDeleteApi = (
  { key, showToast }: apiParams = {
    showToast: false,
    key: "nothin",
  }
) => {
  const { errorToast, successToast } = useToastify();
  const postRequest = (data: dataRequestType) => {
    return axios.delete(data.path);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: postRequest,
    mutationKey: [key],
  });
  // Handling Error and Success Message here!
  function mutationFunction(
    data: dataRequestType,
    callback: (res: any) => void = () => {}
  ) {
    mutate(data, {
      onSuccess: (res: any) => {
        {
          showToast && successToast(res?.data?.message);
        }
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

export default useDeleteApi;
