"use client";

import { SessionProvider } from "next-auth/react"

const Sucker = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return <SessionProvider>
        {children}
    </SessionProvider>
}

export default Sucker;