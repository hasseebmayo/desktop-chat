"use client";

import { useMessageContext } from "@/Provider/MessageProvider";
import ChatBody from "./ChatBody";
import ChatRoomHeader from "./ChatRoomHeader";
import MessageInput from "./MessageInput";
import useSingleChat from "@/hooks/fetchingHook/useSingleChat";
import { IMessage } from "@/models/Messages/Message.model";
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
          <div className="w-[calc(100%-320px)] h-full z-10 relative">
            <ChatRoomHeader />
            <ChatBody chat={response} authId={authData._id} />
            <MessageInput />
          </div>
        )
      ) : (
        <div className="w-[calc(100%-320px)] h-full z-10 relative">
          <>No opened Message</>
        </div>
      )}
    </>
  );
};

export default ChatRoom;
