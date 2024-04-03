"use client"

import React from 'react';
import {useSession} from "next-auth/react";
import NavBarNoUser from "@/src/components/NavBar/NavBarNoUser";
import NavBarUser from "@/src/components/NavBar/NavBarUser";

// @ts-ignore
const NavBar = () => {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log("not authentificated");

        },
    })


    if (!session?.user) return <NavBarNoUser/>

    const name = session.user ? session.user.name : "";
    return (
        <NavBarUser name={name}/>
    )
};

export default NavBar;