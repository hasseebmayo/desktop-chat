"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { MessageContextProvider } from "./MessageProvider";
const Provider = ({ children }: { children: ReactNode }) => {
  const client = new QueryClient();
  return (
    <SessionProvider>
      {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
      <QueryClientProvider client={client}>
        <MessageContextProvider>{children}</MessageContextProvider>
        <ReactQueryDevtools
          position="left"
          initialIsOpen={false}
          buttonPosition="bottom-right"
        />
      </QueryClientProvider>
      {/* </ThemeProvider> */}
      <Toaster />
    </SessionProvider>
  );
};

export default Provider;
