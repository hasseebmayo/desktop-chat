"use client";
import Image from "next/image";
import PlaceHolder from "../../assets/images/Profile.png";
import Video from "../../assets/images/VideoCallIcon.svg";
import Audio from "../../assets/images/AudioCallIcon.svg";
import { useMessageContext } from "@/Provider/MessageProvider";

const ChatRoomHeader = () => {
  const { chatOptions, setChatOptions } = useMessageContext();
  return (
    <div className="w-full bg-primary flex  pt-[26px] pl-[12px] pr-[26px] pb-[22px] justify-between">
      <div className="flex gap-[16px] items-center">
        <Image
          src={PlaceHolder}
          alt="Profile Place Holder"
          className="w-[47px] h-[49px] rounded-[50%] cursor-pointer"
          onClick={() => {
            setChatOptions((prev) => ({ ...prev, sidebar: 5 }));
          }}
        />
        {/* <PlaceHolder /> */}
        <div className="flex flex-col cursor-pointer">
          <h1
            className="text-heading font-semibold text-[#fff] "
            onClick={() => {
              setChatOptions((prev) => ({ ...prev, sidebar: 5 }));
            }}
          >
            {chatOptions.currentActiveUser?.name}
          </h1>
          <p className="text-[16px] font-semibold text-active mt-[-7px]">
            Online
          </p>
        </div>
      </div>

      <div className="flex items-center gap-[17px]">
        <Video
          className="cursor-pointer hover:text-hover w-[40px] h-[40px]
        transition-colors
        "
        />
        <Audio className="cursor-pointer hover:text-hover w-[40px] h-[40px] transition-colors" />
      </div>
    </div>
  );
};

export default ChatRoomHeader;
