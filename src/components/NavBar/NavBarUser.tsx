"use client";

import React, {useState} from 'react';
import Link from "next/link";
import Image from "next/image";
import {Bookmark, Filter, LogOut, PlusCircle} from "react-feather";
import useSWR from "swr";
import fetcher from "@/src/api/fetch";
import ListPostSaved from "@/src/components/ListPostSaved";

// @ts-ignore
const NavBarUser = ({name}) => {
    const {data, error} = useSWR(`/api/user/${name}`, fetcher)
    const [isClicked, setIsClicked] = useState(false);
    const [isClickedSaved, setIsClickedSaved] = useState(false);

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>User dont exist</div>
    if (!data) return <div>Loading...</div>

    const user = data.data;
    const img_src = (user?.pictureUli) ? user.pictureUli : "/images/profile_picture/default.jpg";


    return (
        <nav className=" h-16 flex px-16 items-center bg-bg-200 z-20">
            <Link href="/dashboard">
                <Image className="hover:cursor-pointer" width="175" height="50" objectFit="cover"
                       src="/images/big-logo.svg"
                       alt="layout lab logo"></Image>
            </Link>
            <div className="ml-auto flex items-center gap-8">
                <div className="flex flex-col relative transition-all">
                    <button onClick={() => {
                        setIsClicked(!isClicked)
                        setIsClickedSaved(false)
                    }}>
                        <Filter
                            className={`hover:cursor-pointer hover:fill-accent-100 ${isClicked ? "fill-accent-100" : ""}`}
                            color="#666666" size={20}/>
                    </button>
                    <div
                        className={`transition-all absolute w-72 top-12 -right-12 z-50 ${isClicked ? "block" : "hidden"}`}>
                        <form action="/dashboard"
                              className="bg-bg-200/95 p-4 flex gap-4 items-center justify-center rounded-2xl shadow-lg shadow-black/60">
                            <input required={true} name="filter" id="filter" type="text" placeholder="Search tag..."
                                   className="pt-2 px-2 pb-1 bg-transparent border-b"/>
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>


                <Link href="/new"
                      className="hover:scale-105 transition-all border-accent-glow-500 border-2 hover:underline hover:bg-gradient-to-b from-accent-glow-500 to-accent-glow-500/80 text-accent-glow-500 hover:text-text-100 px-4 py-2 rounded-2xl shadow-lg hover:shadow-accent-glow-500/60 text-center font-normal hover:cursor-pointer flex gap-2 text-md justify-center items-center">
                    <PlusCircle size={20}/>
                    Create
                </Link>
                <div className="flex flex-col relative transition-all">
                    <button onClick={() => {
                        setIsClickedSaved(!isClickedSaved)
                        setIsClicked(false)
                    }}>
                        <Bookmark
                            className={`hover:cursor-pointer hover:fill-accent-100 ${isClickedSaved ? "fill-accent-100" : ""}`}
                            color="#666666" size={20}/>
                    </button>
                    <div onClick={() => setIsClickedSaved(false)}
                         className={`transition-all absolute w-72 top-12 -right-12 z-50 ${isClickedSaved ? "block" : "hidden"}`}>
                        <ListPostSaved/>
                    </div>
                </div>
                <div>
                    <Link href={`/user/${user?.name}`}>
                        <Image
                            className="hover:scale-110 transition-all rounded-full hover:bg-bg-300 hover:cursor-pointer p-1"
                            width="48" height="48"
                            src={img_src} alt="ProfilePicture"/>
                    </Link>
                </div>
                <Link href="/signout_confirm"
                      className="hover:scale-105 transition-all  border-accent-glow-100 border-2 hover:underline hover:bg-gradient-to-b from-accent-glow-100 to-accent-glow-100/80 text-accent-glow-100 hover:text-text-100 px-4 py-2 rounded-2xl shadow-lg hover:shadow-accent-glow-100/60 text-center font-normal hover:cursor-pointer flex gap-2 text-md justify-center items-center">
                    <LogOut size={20}/>
                    Log out
                </Link>
            </div>
        </nav>
    );
};

export default NavBarUser;