"use client";
import { useMessageContext } from "@/Provider/MessageProvider";
import { motion } from "framer-motion";
import Image from "next/image";
import BackArrow from "@/assets/images/ArrowLeft.svg";
import Search from "@/assets/images/SearchIcon.svg";
import Luffy from "@/assets/images/Luffy.jpg";
import NotificatonIcon from "@/assets/images/NotificatonIcon.svg";
import SecurityIcon from "@/assets/images/SecurityIcon.svg";
import HelpIcon from "@/assets/images/HelpIcon.svg";
import Logout from "@/assets/images/Logout.svg";
import { signOut } from "next-auth/react";
import Input from "@/components/Input/Input";
import { ReactNode } from "react";
import useToastify from "@/hooks/useToastify/useToastify";
import { useRouter } from "next/navigation";
const SettingBar = () => {
  const { setChatOptions, authData } = useMessageContext();
  const { successToast } = useToastify();
  const router = useRouter();

  const options: {
    title: string;
    icon: ReactNode;
  }[] = [
    {
      icon: <NotificatonIcon className="h-[30px] w-[30px]" />,
      title: "Notification",
    },
    {
      icon: <SecurityIcon className="h-[30px] w-[30px]" />,
      title: "Security",
    },
    {
      icon: <HelpIcon className="h-[30px] w-[30px]" />,
      title: "Help",
    },
    {
      icon: <Logout className="h-[30px] w-[30px]" />,
      title: "Logout",
    },
  ];
  const handleLogout = () => {
    signOut();
    successToast("Logout Sucessfully");
    router.push("/login");
  };
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
          className="w-[30px] h-[30px] cursor-pointer hover:text-hover 
          text-[#fff]"
        />
        <p className="text-heading font-semibold">Settings</p>
      </div>
      <div className=" ">
        <div className="px-[30px] mt-[10px]">
          <Input placeholder="Search Settings" leftIcon={<Search />} />
        </div>
        <div
          className="flex gap-[10px] items-center hover:bg-[#47464666] px-[30px] py-[5px] cursor-pointer mt-[10px] transition-colors"
          onClick={() => {
            setChatOptions((prev) => ({ ...prev, sidebar: "profile" }));
          }}
        >
          <Image
            className="w-[75px] h-[75px] rounded-[50%]"
            src={authData.profile_img ? authData.profile_img : Luffy}
            alt="Profile Pic"
            width={75}
            height={75}
          />
          <div className="flex flex-col ">
            <h2 className="text-heading  font-semibold text-[#fff] ">
              {authData.name}
            </h2>
            <p className="text-para text-[#fff]">{authData.about}</p>
          </div>
        </div>
        <div>
          {options.map((d, i) => (
            <div
              className="px-[30px] py-[15px] flex items-center gap-[30px] cursor-pointer hover:bg-[#47464666] transition-colors w-full relative text-[#fff]"
              key={d.title}
              onClick={() => {
                if (d.title == "Logout") {
                  handleLogout();
                }
              }}
            >
              {d.icon}
              <div className=" w-full flex flex-col text-[#fff]">
                <h3>{d.title}</h3>
                <div
                  className="w-[77%]  absolute bottom-0 h-[1px] bg-[#47464666]
                -z-0"
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default SettingBar;
