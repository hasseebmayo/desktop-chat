import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import ErrorIcon from "../../assets/images/ErrorIcon.svg";
import { UseFormRegister } from "react-hook-form";

type InputProps = {
  righIcons?: ReactNode;
  label?: string;
  leftIcon?: ReactNode;
  error?: string;
  register?: UseFormRegister<any>;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(function InputComponent(
  {
    leftIcon,
    righIcons,
    label,
    error,
    register,
    className = "",
    ...PROPS
  }: InputProps,
  ref
) {
  return (
    <div className="relative w-full  flex flex-col gap-[5px] text-[#fff]">
      {label && <label className="text-para text-[#fff] ">{label}</label>}
      <div className="relative w-full h-[36px]">
        {leftIcon && (
          <div className="absolute left-[11px] top-[50%] transform -translate-y-1/2 text-white w-[20px] h-[20px]">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          autoComplete={"off"}
          className={`h-full w-full rounded-[100px] pt-[11px] text-[#fff] ${
            leftIcon ? "pl-[37px]" : "pl-[11px]"
          } pb-[11px] bg-[#5436397a] ${className} focus:outline-[#7C39E6] focus:outline outline-none text-[12px] font-light`}
          {...register?.(PROPS.name ?? "")}
          {...PROPS}
          onWheel={() => {
            const activeElement = document.activeElement as HTMLInputElement;
            if (activeElement) {
              activeElement.blur();
            }
          }}
        />
        {righIcons && (
          <div className="absolute top-[50%] right-[11px] transform -translate-y-1/2"></div>
        )}
      </div>
      {error && (
        <span className="flex pt-[-5px] items-center text-[#FF3333] gap-[5px]">
          <ErrorIcon className="w-[16px] h-[16px]" />
          <span className="text-para">{error}</span>
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
