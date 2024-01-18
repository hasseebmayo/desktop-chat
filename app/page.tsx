"use client";
import Header from "@/chatPages/header/Header";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Header />
      <main className="overflow-hidden   flex items-center justify-center h-screen w-screen ">
        <div className="w-[50%] flex flex-col items-center gap-[30px]">
          <div>
            <h2
              className={
                // isColorChanged === "desktop"
                "text-[80px] font-semibold text-hover transition-colors"
                // : "text-[80px] font-semibold text-[#fff] transition-colors"
              }
            >
              Desktop
              <span
              // className={
              //   isColorChanged === "chat" ?
              //     "text-hover" : "text-[#fff]"
              // }
              >
                {" "}
                Chat
              </span>
            </h2>
            <p className=" text-[#000] text-justify">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam
              saepe maiores explicabo corrupti perferendis. Totam, quidem
              repudiandae sint voluptas eius dolor nostrum odio, dolores,
              explicabo deserunt nulla voluptatem vitae fugiat. Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Iusto minus at
              expedita dolores eaque? Esse enim ad sapiente veniam, modi ab
              impedit numquam? Ea, error blanditiis ipsam architecto magnam
              exercitationem!
            </p>
          </div>
          <div className="w-full flex justify-center items-center">
            <button
              className="bg-[white] text-hover  cursor-pointer px-[27px] py-[12px]
          rounded-primary border border-[#7C39E6] hover:bg-hover hover:text-[#fff] transition-colors
          "
              onClick={() => {
                router.push("/login");
              }}
            >
              Try it Out.
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
