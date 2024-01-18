import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginHandler } from "@/utils/Auth/loginController";
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      authorize: async (credentials, req): Promise<User | null> => {
        console.log({});
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        console.log({ email, password });
        return loginHandler({ email, password });
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    jwt(params: any) {
      if (params?.user) {
        params.token.email = params.user.email;
        params.token.id = params.user.id;
      }
      return params.token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
        (session.user as { email: string }).email = token.email as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};
