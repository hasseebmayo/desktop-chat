"use client";
import useSingleChat from "@/hooks/fetchingHook/useSingleChat";
import useSingleUser from "@/hooks/fetchingHook/useSingleUser";
import { IUser } from "@/models/USER/User.model";
import { IChat } from "@/pages/Chat/ChatBody";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
export interface IUserId extends IUser {
  _id: string;
  about: string;
  profile_img: string;
}
export type sidebarTag =
  | "home"
  | "share"
  | "profile"
  | "search"
  | "save"
  | "setting";
interface IMessage {
  id: string | null;
  sidebar: sidebarTag | string;
  currentActiveUser: IUserId | null;
  chatRoomId: string | null;
  chat: IChat[];
  isUserDetail: boolean;
}
interface MessageContextProps {
  chatOptions: IMessage;
  setChatOptions: Dispatch<SetStateAction<IMessage>>;
  authData: IUserId;
}
const MessageContext = createContext<MessageContextProps | undefined>(
  undefined
);
export function useMessageContext(): MessageContextProps {
  const context = useContext(MessageContext);
  if (context) {
    return context;
  } else {
    throw new Error(
      "useMessageContext must be used within a MessageContextProvider"
    );
  }
}

export function MessageContextProvider({ children }: { children: ReactNode }) {
  const { response } = useSingleUser();
  const [chatOptions, setChatOptions] = useState<IMessage>({
    id: null,
    sidebar: "home",
    currentActiveUser: null,
    chatRoomId: null,
    chat: [],
    isUserDetail: false,
  });
  const { response: chatData } = useSingleChat(chatOptions.chatRoomId!);
  const value = {
    chatOptions,
    setChatOptions,
    authData: response,
  };
  useEffect(() => {
    setChatOptions((p) => ({ ...p, chat: chatData }));
  }, [chatData]);
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}
