import toast from "react-hot-toast";

const useToastify = () => {
  function successToast(title: string) {
    toast.success(title, {
      position: "top-right",
      duration: 3000,
    });
  }
  function errorToast(title: string) {
    toast.error(title, {
      position: "top-right",
      duration: 3000,
    });
  }
  return {
    successToast,
    errorToast,
  };
};

export default useToastify;
