"use client";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { motion, AnimatePresence } from "framer-motion";

import Emoji from "../../../assets/images/EmojiIcon.svg";
import Plus from "../../../assets/images/PlusIcon.svg";
import { useRef, useState } from "react";
import useOutsideClick from "@/hooks/useOutsideClick/useOutsideClick";
import MessageInputDropDown from "./MessageInputDropDown";
type leftSideMessageType = {
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
};
const MessageInputLeft = ({ onEmojiClick }: leftSideMessageType) => {
  const emojiContainer = useRef<HTMLDivElement>(null);
  const [isEmoji, setIsEmoji] = useState<boolean>();
  useOutsideClick(emojiContainer, () => {
    setIsEmoji(false);
  });
  return (
    <>
      <AnimatePresence>
        {isEmoji ? (
          <motion.div
            ref={emojiContainer}
            className="absolute top-[-400px] left-[40px]"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <EmojiPicker
              height={400}
              width={700}
              theme={Theme.DARK}
              onEmojiClick={onEmojiClick}
            />
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div className="flex">
        <MessageInputDropDown />
        <AnimatePresence>
          {isEmoji ? (
            <Plus className="h-[30px] w-[30px] cursor-pointer text-hover rotate-[45deg]" />
          ) : (
            <Emoji
              className="h-[30px] w-[30px] hover:text-hover transition-colors cursor-pointer text-[#fff]"
              ref={emojiContainer}
              onClick={() => {
                setIsEmoji((prev) => !prev);
              }}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default MessageInputLeft;
