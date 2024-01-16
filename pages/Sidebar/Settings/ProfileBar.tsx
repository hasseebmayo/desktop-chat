"use client";
import { useMessageContext } from "@/Provider/MessageProvider";
import { motion } from "framer-motion";
import BackArrow from "@/assets/images/ArrowLeft.svg";
import Luffy from "@/assets/images/Luffy.jpg";
import CameraIcon from "@/assets/images/CameraIcon.svg";
import Image from "next/image";
import { useState } from "react";
import ProfileEditbar from "./components/ProfileEditbar";
const ProfileBar = () => {
  const { setChatOptions } = useMessageContext();
  const [file, setFile] = useState<File | null>(null);

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
        <p className="text-heading font-semibold">Profile</p>
      </div>
      <div className="w-full  flex items-center justify-center mt-[30px]">
        <div className="h-[150px] w-[150px] group relative cursor-pointer">
          <div
            className="h-full w-full 
          group-hover:opacity-35
          "
          >
            <Image
              src={file ? URL.createObjectURL(file) : Luffy}
              alt="Profile Image"
              className="h-full w-full rounded-[50%] object-cover"
              width={150}
              height={150}
            />
          </div>
          <div className="h-full w-full absolute top-0 hidden  items-center justify-center z-20 group-hover:flex">
            <CameraIcon className="h-[30px] w-[30px] " />
            <input
              className="absolute h-full w-full opacity-0 cursor-pointer"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  // Use files[0] because FileList may contain multiple files, and we're assuming only one file is selected.
                  setFile(files[0]);
                }
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-[15px]">
        <ProfileEditbar
          name="Haseeb Ahmad"
          caution="This is not yout user name or password"
          title="Your name"
        />
        <ProfileEditbar
          name="Lorem Ipsasdsadsad"
          caution="This is not yout user name or password"
          title="About"
        />
      </div>
    </motion.div>
  );
};

export default ProfileBar;
