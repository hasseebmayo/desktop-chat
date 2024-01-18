"use client";

import { useMessageContext } from "@/Provider/MessageProvider";
import ChatBody from "./ChatBody";
import ChatRoomHeader from "./ChatRoomHeader";
import MessageInput from "./MessageInput";
import useSingleChat from "@/hooks/fetchingHook/useSingleChat";
import { IMessage } from "@/models/Messages/Message.model";
import { motion, AnimatePresence } from "framer-motion";
import ChatUserInfo from "../UserMenu/ChatUserInfo";
import LoadingSpinner from "@/components/Spinner/SpinnerLoader";
import NoData from "@/assets/images/NoDataSVG.svg";
interface IChat extends IMessage {
  createdAt: Date;
  updatedAt: Date;
}
const ChatRoom = () => {
  const { chatOptions, authData } = useMessageContext();
  const { response, isLoading } = useSingleChat(chatOptions.chatRoomId!);
  console.log(chatOptions);
  return (
    <>
      {/* <div className="w-[calc(100%-320px)] h-full z-10 relative"></div> */}
      {chatOptions.id ? (
        isLoading ? (
          <LoadingSpinner height="100%" />
        ) : (
          <motion.div
            className={` ${
              chatOptions.isUserDetail
                ? "w-[calc(100%-320px-390px)]"
                : "w-[calc(100%-320px)]"
            } h-full z-10 relative chat-width_transition`}
          >
            <ChatRoomHeader />
            <ChatBody chat={response} authId={authData._id} />
            <MessageInput />
          </motion.div>
        )
      ) : (
        <div className="w-[calc(100%-320px)] h-full z-10 relative bg-[#000] flex items-center justify-center">
          <div className="flex flex-col items-center justify-center w-[400px] gap-[10px]">
            <NoData className="h-[300px] w-[100%]" />
            <h3 className="text-[48px] text-[#fff] font-bold">Desktop Chat</h3>
            <p className="text-[18px] text-[#fff] text-center font-normal">
              Send and recieve message. Lorem ipsum dolor sit amet consectetur
              adipisicing
            </p>
          </div>
        </div>
      )}

      {chatOptions.isUserDetail ? <ChatUserInfo /> : null}
    </>
  );
};

export default ChatRoom;
