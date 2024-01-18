"use client";
import ChatRoom from "@/pages/Chat/ChatRoom";
import SideBar from "@/pages/Sidebar/SideBar";
import UserMenu from "@/pages/UserMenu/UserMenu";
import SettingBar from "@/pages/Sidebar/Settings/Setting.bar";
import { sidebarTag, useMessageContext } from "@/Provider/MessageProvider";
import SearchBar from "@/pages/Sidebar/Settings/SearchBar";
import SavedBar from "@/pages/Sidebar/Settings/SavedBar";
import ShareBar from "@/pages/Sidebar/Settings/ShareBar";
import { AnimatePresence } from "framer-motion";
import ProfileBar from "@/pages/Sidebar/Settings/ProfileBar";
import { ReactNode } from "react";
import ChatUserInfo from "@/pages/UserMenu/ChatUserInfo";
type sideBarIcons = {
  tag: sidebarTag;
  icon: ReactNode;
};
export default function Home() {
  const { chatOptions } = useMessageContext();

  const Sidebars: sideBarIcons[] = [
    {
      icon: <SearchBar key={"search-bar"} />,
      tag: "search",
    },
    {
      icon: <SavedBar key={"saved-bar"} />,
      tag: "save",
    },
    {
      icon: <ShareBar key={"sharebar"} />,
      tag: "share",
    },
    {
      icon: <SettingBar key={"Setting-bar"} />,
      tag: "setting",
    },
    {
      icon: <ProfileBar key={"profile-bar"} />,
      tag: "profile",
    },
  ];
  return (
    <main className="overflow-hidden flex bg-[#000] mainPage relative">
      <AnimatePresence>
        {Sidebars.map((d, i) => {
          if (chatOptions.sidebar === d.tag) {
            return d.icon;
          }
          return null;
        })}
      </AnimatePresence>

      <SideBar />
      <div className="w-[calc(100%-70px)] bg-[url(../public/images/PrimaryBG.jpg)] bg-cover bg-center relative flex">
        <div className="bg-[#050505ab] absolute w-full h-full  "></div>
        <UserMenu />
        <ChatRoom />
      </div>
    </main>
  );
}
