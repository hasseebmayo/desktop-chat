"use client";
import useSingleUser from "@/hooks/fetchingHook/useSingleUser";
import { IUser } from "@/models/USER/User.model";
import { IChat } from "@/pages/Chat/ChatBody";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";
export interface IUserId extends IUser {
  _id: string;
}
interface IMessage {
  id: string | null;
  sidebar: number;
  currentActiveUser: IUserId | null;
  chatRoomId: string | null;
  chat: IChat[];
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
    sidebar: 0,
    currentActiveUser: null,
    chatRoomId: null,
    chat: [],
  });

  const value = {
    chatOptions,
    setChatOptions,
    authData: response,
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}
