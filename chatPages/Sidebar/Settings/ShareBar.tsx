"use client";
import { useMessageContext } from "@/Provider/MessageProvider";
import { motion, AnimatePresence } from "framer-motion";
import BackArrow from "@/assets/images/ArrowLeft.svg";
import Copy from "@/assets/images/CopyIcon.svg";
import useTimeInterval from "@/hooks/useTimeInterval/useTimeInterval";
import { useEffect, useState } from "react";
const ShareBar = () => {
  const { setChatOptions } = useMessageContext();
  const [isCopied, setIsCopied] = useState<boolean>(false);
  useEffect(() => {
    setTimeout(() => {
      if (isCopied) {
        setIsCopied(false);
      }
    }, 1000);
  }, [isCopied]);

  return (
    <motion.div
      initial={{
        x: -400,
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: -400,
      }}
      transition={{
        type: "tween",
      }}
      className={`
    w-[394px] absolute top-0 left-0 h-full bg-primary mr-[5px] flex flex-col  z-40`}
    >
      <div className="flex gap-[40px] items-center bg-third px-[30px] pt-[51px] pb-[15px] text-[#fff]">
        <BackArrow
          onClick={() => {
            setChatOptions((prev) => ({ ...prev, sidebar: "home" }));
          }}
          className="w-[30px] h-[30px] cursor-pointer hover:text-hover"
        />
        <p className="text-heading font-semibold">Share</p>
      </div>
      <div className="px-[30px] mt-[30px] ">
        <div className=" bg-third rounded-[10px] p-[15px] pt-[25px] relative">
          <div className="absolute right-[10px] top-[5px]">
            <Copy
              className="h-[23px] w-[23px] cursor-pointer hover:text-hover text-[#fff]"
              onClick={() => {
                navigator.clipboard.writeText("Lorem Ipsum");
                setIsCopied(true);
              }}
            />
            <AnimatePresence>
              {isCopied && (
                <motion.span
                  initial={{
                    opacity: 0,
                    y: 10,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: 10,
                  }}
                  className="text-hover absolute bottom-[27px] text-[12px]"
                >
                  Copied
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <p className="text-[#fff]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam
            quibusdam ratione nostrum, voluptatibus iusto impedit modi ut,
            eveniet eos consectetur sequi nemo corporis odio, consequuntur
            facilis repudiandae quaerat labore? Eius.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ShareBar;
