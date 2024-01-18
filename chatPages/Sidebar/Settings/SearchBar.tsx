"use client";
import { IUserId, useMessageContext } from "@/Provider/MessageProvider";
import { motion } from "framer-motion";
import BackArrow from "@/assets/images/ArrowLeft.svg";
import Input from "@/components/Input/Input";
import Search from "@/assets/images/SearchIcon.svg";
import useNotAddedUsrs from "@/hooks/fetchingHook/useNotAddedUser";
import Image from "next/image";
import Profile from "@/assets/images/Profile.png";
import { useState } from "react";
import usePostApi from "@/hooks/usePostApi/usePostApi";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/utils/queryKeys/queryKeys";
import LoadingSpinner from "@/components/Spinner/SpinnerLoader";
const SearchBar = () => {
  const { response, isLoading } = useNotAddedUsrs();
  const [search, setSearch] = useState<string>("");

  const { setChatOptions, authData } = useMessageContext();
  const { mutationFunction } = usePostApi();
  const queryClient = useQueryClient();

  const filteredUsrs = response?.filter((d: IUserId) => {
    const regex = new RegExp(search, "i");
    if (search.trim() === "") {
      return true;
    }
    return regex.test(d.name) || regex.test(d.email);
  });
  const handleCreateRoom = (user: any) => {
    mutationFunction(
      {
        data: {
          members: [authData._id, user._id],
        },
        path: "/api/user/chatroom",
      },
      (res) => {
        queryClient.invalidateQueries({
          queryKey: [queryKeys.get_users],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.get_single_user],
        });
        queryClient.invalidateQueries({
          queryKey: [queryKeys.get_not_added_users],
        });
        setChatOptions((prev) => ({
          ...prev,
          chatRoomId: res?.data?.data?._id,
          currentActiveUser: user,
          id: user._id,
        }));
      }
    );
  };
  return (
    <motion.div
      initial={{
        x: -400,
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: -400,
      }}
      transition={{
        type: "tween",
      }}
      className={`
    w-[394px] absolute top-0 left-0 h-full bg-primary mr-[5px] flex flex-col  z-40`}
    >
      <div className="flex gap-[40px] items-center bg-third px-[30px] pt-[51px] pb-[15px] text-[#fff]">
        <BackArrow
          onClick={() => {
            setChatOptions((prev) => ({ ...prev, sidebar: "home" }));
          }}
          className="w-[30px] h-[30px] cursor-pointer hover:text-hover"
        />
        <p className="text-heading font-semibold">Search Chat</p>
      </div>
      <div className="px-[30px] mt-[10px]">
        <Input
          placeholder="Search Settings"
          leftIcon={<Search />}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      {isLoading ? (
        <LoadingSpinner height="100%" />
      ) : (
        <div className="flex flex-col h-[100%] overflow-y-auto messageScroll">
          {filteredUsrs?.length == 0 ? (
            <div className="w-[100%] flex items-center justify-center h-[60%]">
              <p className="text-[#fff]">No user is found</p>
            </div>
          ) : (
            filteredUsrs?.map((d: IUserId, i: number) => (
              <div
                className="flex gap-[10px] items-center hover:bg-[#47464666] px-[30px] py-[5px] cursor-pointer mt-[10px] transition-colors"
                key={d._id}
                onClick={() => handleCreateRoom(d)}
              >
                <Image
                  className="w-[55px] h-[55px] rounded-[50%]"
                  src={d.profile_img ? d.profile_img : Profile}
                  alt="Profile Pic"
                  height={55}
                  width={55}
                />
                <div className="flex flex-col ">
                  <h2 className="text-heading  font-semibold text-[#fff] ">
                    {d.name}
                  </h2>
                  <p className="text-para text-[#fff]">{d.about}</p>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </motion.div>
  );
};

export default SearchBar;
