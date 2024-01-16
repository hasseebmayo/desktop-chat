"use client";

import { FormEvent, useState } from "react";
import Pencil from "@/assets/images/Pencil.svg";
import CheckIcon from "@/assets/images/CheckIcon.svg";
interface Profile {
  name: string;
  caution?: string;
  title: string;
}
const ProfileEditbar = ({ name, caution, title }: Profile) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [data, setData] = useState<string>(name);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditable(false);
  };
  return (
    <div className="flex flex-col px-[30px] gap-[15px]">
      <h6 className="text-hover text-para font-semibold">{title}</h6>
      {isEditable ? (
        <div className=" profileEditBar flex ">
          <form className="flex w-full" onSubmit={submitHandler}>
            <input
              type="text"
              className="border-none outline-none bg-transparent w-[96%] bgTransparent text-para"
              name="name"
              placeholder="Username"
              value={data}
              onChange={(e) => {
                setData(e.target.value);
              }}
            />
            <CheckIcon
              className="h-[30px] w-[30px]
           cursor-pointer text-hover"
              onClick={() => {
                setIsEditable(false);
              }}
            />
          </form>
        </div>
      ) : (
        <div className="flex items-center w-full justify-between">
          <h1 className="text-para font-semibold text-[#fff]">{data}</h1>
          <Pencil
            className="h-[20px] w-[20px] cursor-pointer"
            onClick={() => {
              setIsEditable(true);
            }}
          />
        </div>
      )}
      {caution && (
        <span className="text-para font-light text-[#fff]">{caution}</span>
      )}
    </div>
  );
};

export default ProfileEditbar;
