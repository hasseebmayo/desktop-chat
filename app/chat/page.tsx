"use client";
import ChatRoom from "@/pages/Chat/ChatRoom";
import SideBar from "@/pages/Sidebar/SideBar";
import UserMenu from "@/pages/UserMenu/UserMenu";
import SettingBar from "@/pages/Sidebar/Settings/Setting.bar";
import { useMessageContext } from "@/Provider/MessageProvider";
import SearchBar from "@/pages/Sidebar/Settings/SearchBar";
import SavedBar from "@/pages/Sidebar/Settings/SavedBar";
import ShareBar from "@/pages/Sidebar/Settings/ShareBar";
import { AnimatePresence } from "framer-motion";
import ProfileBar from "@/pages/Sidebar/Settings/ProfileBar";
export default function Home() {
  const { chatOptions } = useMessageContext();
  const Sidebars = [
    <SearchBar key={"search-bar"} />,
    <SavedBar key={"saved-bar"} />,
    <ShareBar key={"sharebar"} />,
    <SettingBar key={"Setting-bar"} />,
    <ProfileBar key={"profile-bar"} />,
  ];
  return (
    <main className="overflow-hidden flex bg-[#000] mainPage relative">
      <AnimatePresence>
        {Sidebars.map((d, i) => {
          if (chatOptions.sidebar === i + 1) {
            return d;
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
