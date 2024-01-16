"use client";
import { usePathname } from "next/navigation";
import { useRouter, useSearchParams } from "next/navigation";
type queryString = {
  name: string;
  value: string;
};
const useSearchParamsHook = () => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const pathname = usePathname();
  const { replace } = useRouter();

  function updateURL(name: string, value: string) {
    params.set(name, value);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }
  function deleteQuery(name: string) {
    params.delete(name);
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return {
    updateURL,
    params,
    deleteQuery,
  };
};

export default useSearchParamsHook;
