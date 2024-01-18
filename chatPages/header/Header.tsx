"use client";
import Logo from "../../assets/images/Logo.svg";
import Git from "../../assets/images/Github.svg";
import { useRouter } from "next/navigation";
type HeaderType = {
  isAuth: boolean;
};
const Header = ({}) => {
  const router = useRouter();
  return (
    <div className="flex absolute top-[0px] w-full px-[20px] py-[15px] justify-between items-center bg-third">
      <div
        className="flex items-center cursor-pointer group"
        onClick={() => {
          router.push("/");
        }}
      >
        <Logo />
        <span className="text-[18px] pt-[7px] text-[#fff] group-hover:text-hover">
          Desktop Chat
        </span>
      </div>
      <div className="">
        <p className="text-[18px] pt-[7px] text-[#fff] hover:text-hover cursor-pointer">
          Github
        </p>
      </div>
    </div>
  );
};

export default Header;
