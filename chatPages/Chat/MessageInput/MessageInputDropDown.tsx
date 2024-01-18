"use client";
import Plus from "../../../assets/images/PlusIcon.svg";
import Camera from "../../../assets/images/CameraIcon.svg";
import Document from "../../../assets/images/DocumentIcon.svg";
import { ReactNode, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useOutsideClick from "@/hooks/useOutsideClick/useOutsideClick";
type docs = {
  title: string;
  icon: ReactNode;
};

const MessageInputDropDown = () => {
  const [isDropOpen, setIsDropOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);
  const documentArray: docs[] = [
    {
      icon: <Camera className="h-[20px] w-[20px]" />,
      title: "Camera",
    },
    {
      icon: <Document className="h-[20px] w-[20px]" />,
      title: "Document",
    },
  ];

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node) &&
        plusRef.current &&
        !plusRef.current.contains(event.target as Node)
      ) {
        setIsDropOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={containerRef}>
      <AnimatePresence>
        {isDropOpen ? (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="absolute bottom-[57px] bg-primary rounded-primary p-[10px]"
          >
            <ul className="list-none flex flex-col gap-[10px]">
              {documentArray.map((d, i) => (
                <li
                  className="flex gap-[5px] items-center cursor-pointer text-[#fff] hover:text-hover"
                  key={d.title}
                  tabIndex={i}
                >
                  {d.icon}
                  <span>{d.title}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div ref={plusRef}>
        <Plus
          style={{
            rotate: isDropOpen ? "225deg" : "90deg",
            color: isDropOpen ? "#7C39E6" : "#fff",
            transition: "rotate 250ms ease-in-out",
          }}
          onClick={() => {
            setIsDropOpen((prev) => !prev);
          }}
          className={"h-[30px] w-[30px] hover:text-hover  cursor-pointer "}
        />
      </div>
    </div>
  );
};

export default MessageInputDropDown;
