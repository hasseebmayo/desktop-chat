"use client";
import { motion } from "framer-motion";
import CrossIcon from "@/assets/images/CrossIcon.svg";
import Profile from "@/assets/images/Profile.png";
import Trash from "@/assets/images/TrashIcon.svg";
import Block from "@/assets/images/BlockIcon.svg";
import { useMessageContext } from "@/Provider/MessageProvider";
import Image from "next/image";
import useDeleteApi from "@/hooks/useDeleteApi/useDeleteApi";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys/queryKeys";
const ChatUserInfo = () => {
  const { setChatOptions, chatOptions } = useMessageContext();
  const { isPending, mutationFunction } = useDeleteApi();
  const queryClient = useQueryClient();
  const handleMutation = () => {
    mutationFunction(
      {
        path: `/api/user/chatroom/${chatOptions.chatRoomId}`,
      },
      (res) => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.get_not_added_users],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.get_single_user],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.get_users],
        });
        setChatOptions((prev) => ({
          ...prev,
          chat: [],
          chatRoomId: null,
          currentActiveUser: null,
          id: null,
          isUserDetail: false,
        }));
      }
    );
  };
  return (
    <motion.div className="w-[390px] h-full bg-primary z-10 flex flex-col ">
      <div className="flex gap-[40px] items-center bg-third px-[30px] pt-[51px] pb-[15px]">
        <div className="flex gap-[15px] ">
          <CrossIcon
            className="h-[30px] w-[30px] text-[#fff] hover:text-hover cursor-pointer"
            onClick={() => {
              setChatOptions((prev) => ({ ...prev, isUserDetail: false }));
            }}
          />
          <p className="text-heading font-semibold text-[#fff]">Contact Info</p>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col bg-[#5436397a] py-[20px] gap-[14px]">
        <Image
          src={
            chatOptions.currentActiveUser?.profile_img
              ? chatOptions.currentActiveUser?.profile_img
              : Profile
          }
          alt="profile"
          height={200}
          width={200}
          className="h-[200px] w-[200px] rounded-[50%] cursor-pointer"
        />
        <div className="flex flex-col items-center">
          <p className="text-heading text-hover font-semibold">
            {chatOptions.currentActiveUser?.name}
          </p>
          <span className="text-[16px] text-hover">
            {chatOptions.currentActiveUser?.email}
          </span>
        </div>
      </div>
      <div className="bg-[#5436397a] mt-[15px] ">
        <div
          className=" px-[30px] flex items-center gap-[10px] py-[10px] cursor-pointer hover:bg-[#5447487a]"
          onClick={handleMutation}
        >
          <Trash className="h-[25px] w-[25px]  text-[hsl(0,100%,50%)]" />
          <p className="text-heading text-[#FF0000]">Delete</p>
        </div>
        <div className="px-[30px] flex items-center gap-[10px] py-[10px] cursor-pointer hover:bg-[#57535366]">
          <Block className="h-[25px] w-[25px]  text-[#FF0000]" />
          <p className="text-heading text-[#FF0000]">Block</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatUserInfo;
