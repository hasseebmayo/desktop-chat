"use client";
import { useMessageContext } from "@/Provider/MessageProvider";
import { motion } from "framer-motion";
import BackArrow from "@/assets/images/ArrowLeft.svg";
import Input from "@/components/Input/Input";
import Image from "next/image";
import Search from "@/assets/images/SearchIcon.svg";
import Luffy from "@/assets/images/Luffy.jpg";

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
      <div className="flex gap-[40px] items-center bg-third px-[30px] pt-[51px] pb-[15px] text-[#fff]">
        <BackArrow
          onClick={() => {
            setChatOptions((prev) => ({ ...prev, sidebar: "home" }));
          }}
          className="w-[30px] h-[30px] cursor-pointer hover:text-hover"
        />
        <p className="text-heading font-semibold">Saved Chats</p>
      </div>
      <div className="px-[30px] mt-[10px]">
        <Input placeholder="Search" leftIcon={<Search />} />
      </div>
      <div className="flex gap-[10px] items-center hover:bg-[#47464666] px-[30px] py-[5px] cursor-pointer mt-[10px] transition-colors">
        <Image
          className="w-[55px] h-[55px] rounded-[50%]"
          src={Luffy}
          alt="Profile Pic"
        />
        <div className="flex flex-col ">
          <h2 className="text-heading  font-semibold text-[#fff] ">Haseeeb</h2>
          <p className="text-para text-[#fff]">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default SavedBar;
