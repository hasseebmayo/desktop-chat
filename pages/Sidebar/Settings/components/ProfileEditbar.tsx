"use client";

import { FormEvent, useState } from "react";
import Pencil from "@/assets/images/Pencil.svg";
import CheckIcon from "@/assets/images/CheckIcon.svg";
import usePatchApi from "@/hooks/usePatchApi/usePatchApi";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys/queryKeys";
interface Profile {
  name: string;
  caution?: string;
  title: string;
  type: "name" | "about";
}
const ProfileEditbar = ({ name, caution, title, type }: Profile) => {
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [data, setData] = useState<string>(name);
  const { mutationFunction } = usePatchApi("Profile-Updated");
  const queryClient = useQueryClient();
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsEditable(false);
    const submitData =
      type == "about"
        ? {
            about: data,
          }
        : {
            name: data,
          };
    mutationFunction(
      {
        path: `/api/user/me?type=${type}`,
        data: submitData,
      },
      () => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.get_single_user],
        });
      }
    );
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
