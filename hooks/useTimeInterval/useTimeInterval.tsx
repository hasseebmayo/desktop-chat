"use client";

import { useEffect } from "react";
const useTimeInterval = (time: number, callback: () => void) => {
  useEffect(() => {
    const interval = setInterval(() => {
      callback();
    }, time);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useTimeInterval;
