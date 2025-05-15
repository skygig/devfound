import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
            authorization: {
                params: {
                    scope: "read:user",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, account, profile }: any) {
            // Add access_token and GitHub user id to the token

            if (account) {
                token.userId = profile.login;
            }
            return token;
        },
        async session({ session, token }: any) {
            session.userId = token.userId;
            return session;
        },
    },
});

export { handler as GET, handler as POST };
