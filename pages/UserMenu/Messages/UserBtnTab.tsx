"use client";

import { useState } from "react";

const UserBtnTab = () => {
  const [activeBtn, setActiveBtn] = useState<"all" | "group" | "contact">(
    "all"
  );
  return (
    <div className="flex items-center justify-start">
      <div className=" bg-[#000000e0] px-[7px]  rounded-[100px] py-[4px]">
        <button
          className={`${
            activeBtn === "all" ? " bg-third" : ""
          } text-para font-semibold text-[#fff] px-[10px] py-[9px]
          rounded-[100px] transition-colors`}
          onClick={() => {
            setActiveBtn("all");
          }}
        >
          All Chats
        </button>
        <button
          onClick={() => {
            setActiveBtn("group");
          }}
          className={`${
            activeBtn === "group" ? " bg-third" : ""
          } text-para font-semibold text-[#fff] px-[10px] py-[9px]
          rounded-[100px] transition-colors`}
        >
          Groups
        </button>
        <button
          className={`${
            activeBtn === "contact" ? " bg-third" : ""
          } text-para font-semibold text-[#fff] px-[10px] py-[9px]
          rounded-[100px]  transition-colors`}
          onClick={() => {
            setActiveBtn("contact");
          }}
        >
          Contacts
        </button>
      </div>
    </div>
  );
};

export default UserBtnTab;
