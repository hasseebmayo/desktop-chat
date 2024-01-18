import React, { InputHTMLAttributes, useState, forwardRef } from "react";
import ErrorIcon from "../../assets/images/ErrorIcon.svg";
import PasswordHide from "../../assets/images/PasswordHide.svg";
import ShowPassword from "../../assets/images/ShowPassword.svg";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  label?: string;
  error?: string;
  register?: UseFormRegister<any>;
} & InputHTMLAttributes<HTMLInputElement>;

const PasswordInput = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, register, className = "", ...PROPS }, ref) => {
    const [isShow, setIsShow] = useState<boolean>(false);

    return (
      <div className="relative w-full  flex flex-col gap-[5px]">
        {label && <label className="text-para text-[#fff]">{label}</label>}
        <div className="relative w-full h-[36px]">
          <input
            ref={ref}
            className={`h-full w-full rounded-[100px] pt-[11px] 
               pl-[11px] text-[#fff]
           pb-[11px] bg-[#5436397a] ${className} focus:outline-[#7C39E6] focus:outline outline-none text-[12px] font-light`}
            {...PROPS}
            {...register?.(PROPS.name ?? "")}
            type={isShow ? "text" : "password"}
          />

          <div className="absolute top-[50%] right-[11px] transform -translate-y-1/2 text-[#fff]">
            {isShow ? (
              <ShowPassword
                className="h-[25px] w-[25px] cursor-pointer"
                onClick={() => {
                  setIsShow(false);
                }}
              />
            ) : (
              <PasswordHide
                className="h-[25px] w-[25px] cursor-pointer"
                onClick={() => {
                  setIsShow(true);
                }}
              />
            )}
          </div>
        </div>
        {error && (
          <span className="flex pt-[-5px] items-center text-[#FF3333] gap-[5px]">
            <ErrorIcon className="w-[16px] h-[16px]" />
            <span className="text-para">{error}</span>
          </span>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
