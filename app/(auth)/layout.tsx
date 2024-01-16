import { ReactNode } from "react";
import { auth } from "../api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
const AuthLayout = async ({ children }: { children: ReactNode }) => {
  const session = await auth();
  if (session) {
    redirect("/chat");
  }
  return <>{children} </>;
};

export default AuthLayout;
