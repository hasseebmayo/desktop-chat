"use client";

import Input from "../../components/Input/Input";
import SeachIcon from "../../assets/images/SearchIcon.svg";
import ChatIcon from "../../assets/images/ChatIcon.svg";

import UserMessageInfo from "./Messages/UserMessageInfo";
import UserBtnTab from "./Messages/UserBtnTab";
import useUsers from "@/hooks/fetchingHook/useUser";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import { IUserId, useMessageContext } from "@/Provider/MessageProvider";
import LoadingSpinner from "@/components/Spinner/SpinnerLoader";
import { useState } from "react";

const MessagesSection = () => {
  const { isLoading, response } = useUsers();
  const { authData, setChatOptions, chatOptions } = useMessageContext();
  const fetchUserMessages = (user: IUserId) => {
    // Getting common chat room id to connect it to
    // socket io room
    const isCommonRoom = authData.chatrooms.find((d) =>
      user.chatrooms.includes(d)
    );

    setChatOptions((prev) => ({
      ...prev,
      chatRoomId: isCommonRoom ? isCommonRoom.toString() : null,
      currentActiveUser: user,
      id: user._id,
    }));
    return;
  };
  const [search, setSearch] = useState<string>("");
  const filteredUsrs = response?.filter((d: IUserId) => {
    const regex = new RegExp(search, "i");
    if (search.trim() === "") {
      return true;
    }
    return regex.test(d.name) || regex.test(d.email);
  });
  return (
    <>
      <div
        className="bg-primary w-full h-[100%] 
      px-[12px] py-[26px] flex flex-col gap-[21px]
      "
      >
        <div className="">
          <Input
            placeholder="Search here"
            leftIcon={<SeachIcon />}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="flex flex-col gap-[7px] h-[100%]">
          <h2 className="text-heading font-semibold text-[#fff]">Message</h2>
          <UserBtnTab />
          <div
            className="flex flex-col gap-[10px] overflow-y-auto  h-[100%] mb-[40px] 
        messageScroll relative
        "
          >
            {isLoading ? (
              <LoadingSpinner height="100%" width="100%" />
            ) : filteredUsrs?.length === 0 ? (
              <div className="w-[100%] flex items-center justify-center h-[60%]">
                <p className="text-[#fff]">No chat is found</p>
              </div>
            ) : (
              filteredUsrs?.map((d: IUserId, i: number) => (
                <UserMessageInfo
                  name={d?.name}
                  key={d?._id}
                  index={i}
                  profile_image={d?.profile_img}
                  isChatActive={d._id === chatOptions.id}
                  onClick={() => fetchUserMessages(d)}
                />
              ))
            )}
          </div>
          <div className="absolute right-[10px] bottom-[10px] text-[#fff] flex rounded-[50%] items-center justify-center cursor-pointer ">
            <ChatIcon
              className="h-[50px] w-[50px] text-hover hover:text-[#fff]"
              onClick={() => {
                setChatOptions((prev) => ({ ...prev, sidebar: "search" }));
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MessagesSection;
