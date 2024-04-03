"use client"

import { SessionProvider } from "next-auth/react"

// @ts-ignore
const Provider = ({children,session}) => {
    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>

    );
};

export default Provider;