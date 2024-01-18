import Profile from "../../../assets/images/Profile.png";
import Image from "next/image";
interface IUserMessage {
  name: string;
  message?: string;
  unread?: string;
  onClick?: () => void;
  index: number;
  isChatActive: boolean;
  profile_image?: string | null;
}
const UserMessageInfo = ({
  message,
  name,
  unread,
  onClick,
  index,
  profile_image,
  isChatActive,
}: IUserMessage) => {
  return (
    <div
      className={`w-full py-[7px] px-[7px] ${
        isChatActive ? "bg-hover" : "bg-third"
      }  flex gap-[28px] items-center rounded-primary cursor-pointer relative  hover:bg-[#8f54a0] group  transition-colors `}
      tabIndex={index}
      onClick={onClick}
    >
      <Image
        src={profile_image ? profile_image : Profile}
        alt="profil"
        className="w-[40px] h-[40px] rounded-[50%] "
        height={40}
        width={40}
      />
      <div className="flex flex-col ">
        <h2 className="text-para font-semibold text-[#fff]">{name}</h2>
        <p
          className="
        text-para font-semibold 
        text-[#767876] group-hover:text-[#fff]"
        >
          {" "}
          Good
        </p>
      </div>
      <div className="absolute right-[15px] transform -translate-y-1/2 top-[50%] w-[24px] h-[24px] bg-[#00FF38] text-[#000] flex items-center justify-center rounded-[50%]">
        <span>0</span>
      </div>
    </div>
  );
};

export default UserMessageInfo;
