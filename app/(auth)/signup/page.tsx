"use client";
import Input from "@/components/Input/Input";
import Header from "@/pages/header/Header";
import PasswordInput from "@/components/Input/PassswordInput";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { zodUserSchema } from "@/utils/schema/zodUserSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import usePostApi from "@/hooks/usePostApi/usePostApi";
type userType = z.infer<typeof zodUserSchema>;
const SignupPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<userType>({
    resolver: zodResolver(zodUserSchema),
  });
  const { mutationFunction: mutate, isPending } = usePostApi();
  const OnSubmit: SubmitHandler<userType> = (d) => {
    mutate(
      {
        data: d,
        path: "/api/signup",
      },
      () => {
        router.push("/login");
      }
    );
  };

  return (
    <>
      <Header />
      <div className="mt-[130px] w-full flex justify-center items-center ">
        <div className="border border-primary w-[80%] md:w-[40%] px-[20px] py-[30px] rounded-primary shadowForm  bg-third">
          <form
            className="w-full flex flex-col gap-[18px]"
            onSubmit={handleSubmit(OnSubmit)}
          >
            <h1 className="text-[29px] font-semibold text-center ">Sign Up</h1>
            <Input
              label="Name"
              placeholder="Enter name"
              className="rounded-primary"
              error={errors.name?.message}
              register={register}
              {...register("name")}
            />
            <Input
              label="Email"
              placeholder="Enter a email"
              className="rounded-primary"
              error={errors.email?.message}
              register={register}
              {...register("email")}
            />
            <PasswordInput
              label="Password"
              error={errors.password?.message}
              placeholder="Enter a password"
              register={register}
              className="rounded-primary "
              {...register("password")}
            />

            <div className="flex justify-end items-end">
              <span
                className="cursor-pointer text-[#fff] hover:text-hover"
                tabIndex={12}
                onClick={() => {
                  router.push("/login");
                }}
              >
                Already have a accout?{" "}
              </span>
            </div>
            <div className="w-full flex justify-center items-center">
              <button
                className="bg-[white] text-hover w-full  cursor-pointer px-[27px] py-[10px]
          rounded-primary border border-[#7C39E6] hover:bg-hover hover:text-[#fff] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
          "
                disabled={isPending}
              >
                {" "}
                {isPending ? "Loading..." : "Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
