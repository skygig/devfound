import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "read:user public_repo",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }: any) {
      if (account) {
        token.access_token = account.access_token;
        token.userId = profile.login;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.userId = token.userId;
      session.access_token = token.access_token;
      return session;
    },
  },
};
