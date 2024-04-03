"use client";

import React from 'react';
import Image from "next/image";
import useSWR from "swr";
import fetcher from '@/src/api/fetch';
import {Bookmark, Edit, Eye, FileText, Heart, Mail, MapPin, MessageCircle} from "react-feather";
import PostCard from "@/src/components/PostCard";
import {useSession} from "next-auth/react";
import Link from 'next/link'
// @ts-ignore


const Page = ({params}: {
    params: { name: string };
}) => {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log("not authentificated");

        },
    })
    const {data, error} = useSWR(`/api/posts/user/${params.name}`, fetcher)

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>User dont exit</div>
    if (!data) return <div>Loading...</div>

    const [user, posts] = data.data;

    const img_src = (user.pictureUli) ? user.pictureUli : "/images/profile_picture/default.jpg";
    const desc = user.description ? user?.description : "This user has not yet provided a biography.";
    const location = user.location ? user?.location : "In the world";
    const nb_post = user.posts ? user.posts.length : 0;
    const nb_comment = user.comments ? user.comments.length : 0;
    const nb_post_readed = user.postReaded ? user.postReaded.filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index).length : 0;
    const nb_post_liked = user.postLiked ? user.postLiked.length : 0;
    const nb_post_saved = user.postSaved ? user.postSaved.length : 0;
    const isAdmin = user.isAdmin || user.name === session?.user?.name;
    return (
        <main
            className="mb-16 w-full backdrop-blur-2xl flex flex-col gap-8 items-center">
            <section className="w-full h-96 bg-gradient-to-r from-accent-glow-300/40 to-accent-glow-100/40 -mb-96">

            </section>
            <section
                className="bg-bg-200/90 flex flex-col items-center shadow-black shadow-2xl w-3/5 rounded-2xl gap-2 p-8">
                <div className="self-end">{isAdmin ?
                    <Link href={`/user/${params.name}/settings`}
                          className="hover:scale-105 transition-all  rounded-lg border-accent-glow-500 border-2 flex items-center p-2 px-4 gap-2 text-accent-glow-500 font-semibold hover:underline hover:bg-gradient-to-b from-accent-glow-500 to-accent-glow-500/80 hover:text-text-100 shadow-lg hover:shadow-accent-glow-500/60">
                        <Edit width='20'/>
                        <p>Edit profile</p>
                    </Link>
                    : <></>}</div>
                <Image className="rounded-full" width="150" height="150" src={img_src}
                       alt={user?.name + "profile picture"}/>
                <h1 className="text-3xl font-black mt-8">{user?.name}</h1>
                <p>{desc}</p>
                <div className="flex items-center gap-8 my-2">
                    <div
                        className="text-primary-300 font-medium flex items-center gap-2 p-2 px-4 bg-bg-300/40 rounded-2xl shadow-black/40 shadow-lg">
                        <MapPin width='20'/>
                        <p>{location}</p>
                    </div>
                    <div
                        className="text-primary-300 font-medium flex items-center gap-2 p-2 px-4 bg-bg-300/40 rounded-2xl shadow-black/40 shadow-lg">
                        <Mail width='20'/>
                        <p>{user.email}</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 my-2">
                    <div
                        className="text-primary-300 font-medium flex items-center gap-2 p-2 px-4 bg-bg-300/40 rounded-2xl shadow-black/40 shadow-lg">
                        <FileText width='20'/>
                        <p>{nb_post} post published</p>
                    </div>
                    <div
                        className="text-primary-300 font-medium flex items-center gap-2 p-2 px-4 bg-bg-300/40 rounded-2xl shadow-black/40 shadow-lg">
                        <MessageCircle width='20'/>
                        <p>{nb_comment} comment written</p>
                    </div>
                    <div
                        className="text-primary-300 font-medium flex items-center gap-2 p-2 px-4 bg-bg-300/40 rounded-2xl shadow-black/40 shadow-lg">
                        <Eye width='20'/>
                        <p>{nb_post_readed} post readed</p>
                    </div>
                </div>
                <div className="flex items-center gap-8 my-2">
                    <div
                        className="text-primary-300 font-medium flex items-center gap-2 p-2 px-4 bg-bg-300/40 rounded-2xl shadow-black/40 shadow-lg">
                        <Heart width='20'/>
                        <p>{nb_post_liked} post liked</p>
                    </div>
                    <div
                        className="text-primary-300 font-medium flex items-center gap-2 p-2 px-4 bg-bg-300/40 rounded-2xl shadow-black/40 shadow-lg">
                        <Bookmark width='20'/>
                        <p>{nb_post_saved} post saved</p>
                    </div>
                </div>
            </section>
            <section>
                <div className="flex flex-col w-full gap-8">
                    {
                        // @ts-ignore
                        posts.map((post: { id: React.Key | null | undefined; }) => (
                            <PostCard key={post.id} post={post}/>
                        ))
                    }
                </div>

            </section>

        </main>
    );
};

export default Page;