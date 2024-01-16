"use client";
import { useMessageContext } from "@/Provider/MessageProvider";
import { IMessage } from "@/models/Messages/Message.model";
import { timeIn12Format } from "@/utils/Date/dateUtils";

export interface IChat extends IMessage {
  createdAt: Date;
  updatedAt: Date;
  _id: string;
}
type messages = {
  chat: IChat[];
  authId: string;
};
const ChatBody = ({ chat, authId }: messages) => {
  const { chatOptions } = useMessageContext();

  return (
    <div className="h-[78%] overflow-y-auto pl-[12px] pt-[18px] pr-[6px] chatBody">
      <div className="flex w-full items-center justify-center sticky top-0 z-[1000]">
        <div className="text-[18px] font-semibold text-[#fff] mb-[10px] px-[20px] py-[5px] bg-secondry rounded-primary ">
          Today
        </div>
      </div>
      {chatOptions.chat?.map((data) => (
        <div key={data._id} className="w-full">
          {authId !== data?.senderId?.toString() ? (
            <div className="messageLeft flex mb-[10px]">
              <div className=" flex bg-third rounded-[10px] py-[10px] px-[10px] w-auto">
                <div className="flex w-auto relative flex-col text-[#fff] text-[16px] ">
                  {data.message}
                  <span className=" self-end text-active text-para font-semibold">
                    {timeIn12Format(data.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          ) : null}
          {authId === data?.senderId?.toString() ? (
            <div className="flex justify-end mb-[10px]">
              <div className="messageLeft flex justify-end">
                <div className=" flex bg-third rounded-[10px] py-[10px] px-[10px] w-auto">
                  <div className="flex w-auto relative flex-col text-[#fff] text-[16px] ">
                    {data.message}
                    <span className=" self-end text-active text-para font-semibold">
                      {timeIn12Format(data.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default ChatBody;
