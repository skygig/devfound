import NextAuth from "next-auth";  // eslint-disable-line @typescript-eslint/no-unused-vars

declare module "next-auth" {
    interface Session {
        userId?: string;
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
    }
}
