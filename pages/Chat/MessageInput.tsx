"use client";
import Microphone from "../../assets/images/Microphone.svg";
import Send from "../../assets/images/SendIcon.svg";
import { useEffect, useRef, useState } from "react";
import MessageInputLeft from "./MessageInput/MessageInputLeft";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import { useMessageContext } from "@/Provider/MessageProvider";
import { useQueryClient } from "@tanstack/react-query";
import useToastify from "@/hooks/useToastify/useToastify";
import { socket } from "@/utils/socket/socket";

const MessageInput = () => {
  const textareaRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState<string>("");
  const [chat, setChat] = useState<any>();
  const { authData, chatOptions, setChatOptions } = useMessageContext();
  const { errorToast } = useToastify();
  const { mutationFunction } = usePostApi();
  const queryClient = useQueryClient();
  const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
    const content = event.currentTarget.innerText;
    setMessage(content);
  };
  useEffect(() => {
    const handleChat = (data: any) => {
      // setChatOptions((prev) => ({ ...prev, chat: data }));
      console.log(data);
    };

    socket.on("chat", handleChat);
  }, []);
  useEffect(() => {
    socket.emit("join-room", chatOptions.chatRoomId);
  }, [chatOptions.chatRoomId]);
  const sendMessage = () => {
    if (message.trim() === "") {
      return;
    }
    if (!chatOptions.chatRoomId) {
      errorToast("Chat room id is missing!");
      return;
    }
    socket.emit(
      "send-message",
      {
        message,
        chatroomId: chatOptions.chatRoomId,
        createdAt: new Date(),
        senderId: authData._id,
      }
      // (data: any) => {
      //   setChatOptions((prev) => ({ ...prev, chat: data }));
      //   setMessage("");
      //   if (textareaRef.current) {
      //     textareaRef.current.innerText = "";
      //   }
      // }
    );

    // mutationFunction(
    //   {
    //     data: {
    //       senderId: authData._id,
    //       chatroomId: chatOptions.chatRoomId,
    //       message,
    //     },
    //     path: "/api/user/chat",
    //   },
    //   () => {
    //     if (textareaRef?.current) {
    //       textareaRef.current.innerText = "";
    //       setMessage("");
    //     }
    //     queryClient.invalidateQueries({
    //       refetchType: "active",
    //       queryKey: [queryKeys.get_single_chat, chatOptions.chatRoomId],
    //     });
    //   }
    // );
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      // Insert a line break (newline) at the cursor position
      document.execCommand("insertHTML", false, "<br/>");
    } else if (event.key === "Enter") {
      event.preventDefault(); // Prevents creating a new line
      sendMessage();
    } else if (event.key === " " && !event.shiftKey) {
      event.preventDefault(); // Prevents creating a long space
      document.execCommand("insertText", false, " ");
    }
  };

  useEffect(() => {
    socket.on("connection", () => {
      console.log("On");
    });
  }, []);
  useEffect(() => {
    // Adjust the bottom position based on the content height
    if (textareaRef.current) {
      const contentHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.bottom = `-${contentHeight}px - 26px`;
    }
  }, [message]);

  return (
    <div className="flex px-[16px] w-[100%] items-center relative justify-between mb-[10px] ">
      <MessageInputLeft
        onEmojiClick={(val) => {
          if (textareaRef.current) {
            textareaRef.current.innerText =
              textareaRef.current.innerText + val.emoji;
            setMessage((prev) => prev + val.emoji);
          }
        }}
      />

      <div className="w-[86%] relative">
        <div
          className={`textarea`}
          contentEditable
          onInput={handleInputChange}
          onKeyDown={handleKeyPress}
          ref={textareaRef}
        ></div>
        {message === "" && (
          <span className="absolute top-[-18px] left-[20px] text-[#fff] text-[18px]">
            Message...
          </span>
        )}
      </div>
      <div
        className="flex w-[60px] h-[60px] bg-[#312F2F] rounded-[50%] items-center justify-center group text-[#fff] hover:text-hover
       cursor-pointer hover:outline-[#7C39E6] hover:outline transition-all"
      >
        {message?.trim() === "" ? (
          <Microphone className="w-[30px] h-[30px]" />
        ) : (
          <Send className="w-[30px] h-[30px]" onClick={sendMessage} />
        )}
      </div>
    </div>
  );
};

export default MessageInput;
