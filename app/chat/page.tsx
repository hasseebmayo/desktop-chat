"use client";
import ChatRoom from "@/chatPages/Chat/ChatRoom";
import SideBar from "@/chatPages/Sidebar/SideBar";
import UserMenu from "@/chatPages/UserMenu/UserMenu";
import SettingBar from "@/chatPages/Sidebar/Settings/Setting.bar";
import { sidebarTag, useMessageContext } from "@/Provider/MessageProvider";
import SearchBar from "@/chatPages/Sidebar/Settings/SearchBar";
import SavedBar from "@/chatPages/Sidebar/Settings/SavedBar";
import ShareBar from "@/chatPages/Sidebar/Settings/ShareBar";
import { AnimatePresence } from "framer-motion";
import ProfileBar from "@/chatPages/Sidebar/Settings/ProfileBar";
import { ReactNode } from "react";
import ChatUserInfo from "@/chatPages/UserMenu/ChatUserInfo";
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
