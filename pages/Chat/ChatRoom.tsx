"use client";

import { useMessageContext } from "@/Provider/MessageProvider";
import ChatBody from "./ChatBody";
import ChatRoomHeader from "./ChatRoomHeader";
import MessageInput from "./MessageInput";
import useSingleChat from "@/hooks/fetchingHook/useSingleChat";
import { IMessage } from "@/models/Messages/Message.model";
import { motion, AnimatePresence } from "framer-motion";
import ChatUserInfo from "../UserMenu/ChatUserInfo";
interface IChat extends IMessage {
  createdAt: Date;
  updatedAt: Date;
}
const ChatRoom = () => {
  const { chatOptions, authData } = useMessageContext();
  const { response, isLoading } = useSingleChat(chatOptions.chatRoomId!);

  return (
    <>
      {chatOptions.id ? (
        isLoading ? (
          <>Loading Data</>
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
        <div className="w-[calc(100%-320px)] h-full z-10 relative">
          <>No opened Message</>
        </div>
      )}

      {chatOptions.isUserDetail ? <ChatUserInfo /> : null}
    </>
  );
};

export default ChatRoom;
