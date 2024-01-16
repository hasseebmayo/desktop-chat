"use client";
import { useMessageContext } from "@/Provider/MessageProvider";
import { motion } from "framer-motion";
import BackArrow from "@/assets/images/ArrowLeft.svg";
const SavedBar = () => {
  const { setChatOptions } = useMessageContext();

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
      <div className="flex gap-[40px] items-center bg-third px-[30px] pt-[51px] pb-[15px]">
        <BackArrow
          onClick={() => {
            setChatOptions((prev) => ({ ...prev, sidebar: 0 }));
          }}
          className="w-[30px] h-[30px] cursor-pointer hover:text-hover"
        />
        <p className="text-heading font-semibold">Saved Chats</p>
      </div>
    </motion.div>
  );
};

export default SavedBar;
