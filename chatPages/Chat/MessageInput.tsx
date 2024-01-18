"use client";
import Microphone from "../../assets/images/Microphone.svg";
import Send from "../../assets/images/SendIcon.svg";
import { useEffect, useRef, useState } from "react";
import MessageInputLeft from "./MessageInput/MessageInputLeft";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import { useMessageContext } from "@/Provider/MessageProvider";
import { useQueryClient } from "@tanstack/react-query";
import useToastify from "@/hooks/useToastify/useToastify";
import { io } from "socket.io-client";
const MessageInput = () => {
  const textareaRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<any>();

  const [message, setMessage] = useState<string>("");
  const { authData, chatOptions, setChatOptions } = useMessageContext();
  const { errorToast } = useToastify();
  const handleInputChange = (event: React.FormEvent<HTMLDivElement>) => {
    const content = event.currentTarget.innerText;
    setMessage(content);
  };

  const sendMessage = () => {
    if (message.trim() === "") {
      return;
    }
    if (!chatOptions.chatRoomId) {
      errorToast("Chat room id is missing!");
      return;
    }
    const messageData: any = {
      message,
      chatroomId: chatOptions.chatRoomId,
      senderId: authData._id,
      createdAt: new Date(),
    };
    socket.emit("send_message", messageData);

    setChatOptions((prevv) => ({
      ...prevv,
      chat: [...prevv.chat, messageData],
    }));
    if (textareaRef?.current) {
      textareaRef.current.innerText = "";
      setMessage("");
    }
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
    // Adjust the bottom position based on the content height
    if (textareaRef.current) {
      const contentHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.bottom = `-${contentHeight}px - 26px`;
    }
  }, [message]);
  useEffect(() => {
    if (socket) {
      socket.emit("join_room", chatOptions.chatRoomId);
    }
  }, [chatOptions.chatRoomId, socket]);
  useEffect(() => {
    if (socket) {
      socket.on("receive_message", (data: any) => {
        console.log("data:", data);
        setChatOptions((p) => ({ ...p, chat: [...p.chat, data] }));
      });
      socket.on("update_messages", (data: any) => {
        console.log("updateMessages from DB", data);
      });
    }
  }, [socket, setChatOptions]);

  useEffect(() => {
    setSocket(
      io("https://hasseebmayp.fly.dev", {
        withCredentials: true,
      })
    );
  }, []);

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

      <div
        className={
          chatOptions.isUserDetail ? "w-[78%] relative" : "w-[86%] relative"
        }
      >
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
