"use client";
import Input from "@/components/Input/Input";
import Header from "@/pages/header/Header";

import PasswordInput from "@/components/Input/PassswordInput";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodLoginSchema } from "@/utils/schema/zodAuthSchema";
import { z } from "zod";
import { signIn } from "next-auth/react";
import useToastify from "@/hooks/useToastify/useToastify";
type loginType = z.infer<typeof zodLoginSchema>;
const LoginPage = () => {
  const { errorToast, successToast } = useToastify();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginType>({
    resolver: zodResolver(zodLoginSchema),
  });
  const OnSubmit: SubmitHandler<loginType> = async (d) => {
    try {
      const response = await signIn("credentials", { ...d, redirect: false });
      if (response?.error) {
        errorToast("Invalid Credentials");
        return;
      }
      successToast("Logged in sucessfully");
      router.push("/chat");
    } catch (error) {}
  };

  return (
    <>
      <Header />
      <div className="h-screen w-full flex justify-center items-center ">
        <div className="border border-primary w-[40%] px-[20px] py-[30px] rounded-primary shadowForm bg-third ">
          <form
            className="w-full flex flex-col gap-[18px]"
            onSubmit={handleSubmit(OnSubmit)}
          >
            <h1 className="text-[29px] font-semibold text-center ">Login</h1>
            <Input
              label="UserName"
              placeholder="Email"
              className="rounded-primary"
              register={register}
              {...register("email")}
              error={errors?.email?.message}
            />

            <PasswordInput
              label="Password"
              placeholder="Password"
              className="rounded-primary"
              register={register}
              {...register("password")}
              error={errors.password?.message}
            />

            <div className="flex justify-end items-end">
              <span
                className="cursor-pointer text-[#fff] hover:text-hover focus:border"
                tabIndex={1234}
                onClick={() => {
                  router.push("/signup");
                }}
              >
                Dont Have a accout?{" "}
              </span>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className="bg-[white] text-hover w-full  cursor-pointer px-[27px] py-[10px]
          rounded-primary border border-[#7C39E6] hover:bg-hover hover:text-[#fff] transition-colors
          "
              >
                {" "}
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
