"use client";
import { ReactNode } from "react";
import HomeIcon from "../../assets/images/HomeIcon.svg";
import SearchIcon from "../../assets/images/SearchIcon.svg";
import SaveIcon from "../../assets/images/SaveIcon.svg";
import ShareIcon from "../../assets/images/ShareIcon.svg";
import SettingIcon from "../../assets/images/SettingIcon.svg";
import Logo from "../../assets/images/Logo.svg";
import Placeholder from "../../assets/images/Placeholder.svg";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import useToastify from "@/hooks/useToastify/useToastify";
import { useMessageContext } from "@/Provider/MessageProvider";
type icons = {
  icon: ReactNode;
  title: string;
};
const SideBar = () => {
  const navIcon: icons[] = [
    {
      icon: <HomeIcon />,
      title: "Home",
    },
    {
      icon: <SearchIcon />,
      title: "Search",
    },
    {
      icon: <SaveIcon />,
      title: "Save",
    },
    {
      icon: <ShareIcon />,
      title: "Share",
    },
    {
      icon: <SettingIcon />,
      title: "Settings",
    },
  ];
  const router = useRouter();
  const { successToast } = useToastify();
  const { chatOptions, setChatOptions } = useMessageContext();

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
              ${chatOptions.sidebar === i ? "text-hover" : "text-[#fff]"}
                text-[#fff] hover:text-hover transition-colors`}
            key={i}
            onClick={() => {
              setChatOptions((prev) => ({ ...prev, sidebar: i }));
            }}
          >
            {d.icon}
            <span className="text-para ">{d.title}</span>
          </div>
        ))}
      </div>
      <div className=" flex items-center justify-center mt-auto">
        <Placeholder
          className="cursor-pointer"
          onClick={() => {
            setChatOptions((p) => ({ ...p, sidebar: 5 }));
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
