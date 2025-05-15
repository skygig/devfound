"use client";

import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import { store } from '@/store/store'

const Sucker = ({ children }: Readonly<{
    children: React.ReactNode;
}>) => {
    return <SessionProvider>
        <Provider store={store}>
            {children}
        </Provider>
    </SessionProvider>
}

export default Sucker;