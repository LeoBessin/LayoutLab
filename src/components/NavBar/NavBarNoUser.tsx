import React from 'react';
import Link from "next/link";
import Image from "next/image";
import {LogIn} from "react-feather";

const NavBarNoUser = () => {
    return (
        <nav className=" h-16 flex px-16 items-center bg-bg-200 z-20">
            <Link href="/dashboard">
                <Image className="hover:cursor-pointer" width="175" height="50" objectFit="cover"
                       src="/images/big-logo.svg" alt="layout lab logo"></Image>
            </Link>
            <div className="ml-auto flex items-center gap-8">
                <Link href="/enter"
                      className="hover:cursor-pointer hover:underline hover:bg-bg-300 py-2 px-4 rounded-2xl">Log
                    in</Link>
                <Link href="/enter?state=new-user"
                      className="hover:scale-105 transition-all border-accent-glow-300 border-2 hover:underline hover:bg-gradient-to-b from-accent-glow-300 to-accent-glow-300/80 text-accent-glow-300 hover:text-text-100 px-4 py-2 rounded-2xl shadow-lg hover:shadow-accent-glow-300/60 text-center font-normal hover:cursor-pointer flex gap-2 text-md justify-center items-center">
                    <LogIn size={18}/>
                    Create account
                </Link>
            </div>
        </nav>
    );
};

export default NavBarNoUser;