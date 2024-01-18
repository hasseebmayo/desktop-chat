"use client";
import { ReactNode } from "react";
import HomeIcon from "../../assets/images/HomeIcon.svg";
import SearchIcon from "../../assets/images/SearchIcon.svg";
import SaveIcon from "../../assets/images/SaveIcon.svg";
import ShareIcon from "../../assets/images/ShareIcon.svg";
import SettingIcon from "../../assets/images/SettingIcon.svg";
import Logo from "../../assets/images/Logo.svg";
import Placeholder from "../../assets/images/Placeholder.svg";
import Profile from "../../assets/images/Profile.png";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Image from "next/image";
import useToastify from "@/hooks/useToastify/useToastify";
import { sidebarTag, useMessageContext } from "@/Provider/MessageProvider";
type icons = {
  icon: ReactNode;
  title: string;
  tag: sidebarTag;
};
const SideBar = () => {
  const navIcon: icons[] = [
    {
      icon: <HomeIcon />,
      title: "Home",
      tag: "home",
    },
    {
      icon: <SearchIcon />,
      title: "Search",
      tag: "search",
    },
    {
      icon: <ShareIcon />,
      title: "Share",
      tag: "share",
    },
    {
      icon: <SettingIcon />,
      title: "Settings",
      tag: "setting",
    },
  ];
  const router = useRouter();
  const { successToast } = useToastify();
  const { chatOptions, setChatOptions, authData } = useMessageContext();

  return (
    <div className="w-[70px] h-full bg-primary mr-[5px] flex flex-col py-[26px] ">
      <div className="w-full flex items-center justify-center">
        <Logo
          className="cursor-pointer"
          onClick={() => {
            router.push("/");
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-[15px] mt-[56px]  ">
        {navIcon.map((d, i) => (
          <div
            className={`flex flex-col items-center cursor-pointer gap-[2px] nav-icons 
              ${chatOptions.sidebar === d.tag ? "text-hover" : "text-[#fff]"}
                text-[#fff] hover:text-hover transition-colors`}
            key={i}
            onClick={() => {
              setChatOptions((prev) => ({ ...prev, sidebar: d.tag }));
            }}
          >
            {d.icon}
            <span className="text-para ">{d.title}</span>
          </div>
        ))}
      </div>
      <div className=" flex items-center justify-center mt-auto">
        <Image
          src={authData?.profile_img ? authData?.profile_img : Profile}
          className="h-[46px] w-[46px] rounded-[50%] cursor-pointer"
          alt="Profile Image"
          width={46}
          height={46}
          onClick={() => {
            setChatOptions((p) => ({
              ...p,
              sidebar: "profile",
            }));
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
