"use client";

import Input from "../../components/Input/Input";
import SeachIcon from "../../assets/images/SearchIcon.svg";
import ChatIcon from "../../assets/images/ChatIcon.svg";

import UserMessageInfo from "./Messages/UserMessageInfo";
import UserBtnTab from "./Messages/UserBtnTab";
import useUsers from "@/hooks/fetchingHook/useUser";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import { IUserId, useMessageContext } from "@/Provider/MessageProvider";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys/queryKeys";

const MessagesSection = () => {
  const { isLoading, response } = useUsers();

  const { mutationFunction } = usePostApi();
  const { authData, setChatOptions, chatOptions } = useMessageContext();
  const queryClient = useQueryClient();

  const fetchUserMessages = (user: IUserId) => {
    // We'll compare if the both user have the same chatId in the chatrooms array then it will proceed to create new chat room
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
  return (
    <>
      {isLoading ? (
        <>Loading</>
      ) : (
        <div
          className="bg-primary w-full h-[100%] 
      px-[12px] py-[26px] flex flex-col gap-[21px]
      "
        >
          <div className="">
            <Input placeholder="Search here" leftIcon={<SeachIcon />} />
          </div>
          <div className="flex flex-col gap-[7px] h-[100%]">
            <h2 className="text-heading font-semibold">Message</h2>
            <UserBtnTab />
            <div
              className="flex flex-col gap-[10px] overflow-y-auto  h-[100%] mb-[40px] 
        messageScroll relative
        "
            >
              {response?.map((d: IUserId, i: number) => (
                <UserMessageInfo
                  name={d?.name}
                  key={d?._id}
                  index={i}
                  isChatActive={d._id === chatOptions.id}
                  onClick={() => fetchUserMessages(d)}
                />
              ))}
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
      )}
    </>
  );
};

export default MessagesSection;
