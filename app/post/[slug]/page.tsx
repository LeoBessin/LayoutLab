"use client";

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import Link from 'next/link'
import useSWR from "swr";
import fetcher from "@/src/api/fetch";
import Comment from "@/src/components/Comment";
import FormPostComment from "@/src/components/FormPostComment";
import {useSession} from "next-auth/react";
import {Edit, Trash2} from "react-feather";


const Page = ({params}: {
    params: { slug: number };
}) => {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log("not authentificated");

        },
    })

    const [isSended, setIsSended] = useState(false);


    const {data, error} = useSWR(`/api/post/${params.slug}`, fetcher)

    async function handleView() {
        try {
            const formData = new FormData()
            const userName = session?.user ? session.user.name : "";
            const postSlug = params.slug ? params.slug.toString() : "0";
            // @ts-ignore
            formData.append("userName", userName)
            formData.append("postSlug", postSlug)

            const response = await fetch('/api/view', {
                method: 'POST',
                body: formData,
            })

            setIsSended(false)
        } catch (error) {
            // Handle error if necessary
            console.error(error)
        }
    }

    useEffect(() => {
        if (session?.user && !isSended) {
            handleView()
            setIsSended(false)
        }
    }, []);

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>Post dont exit</div>
    if (!data) return <div>Loading...</div>

    const [post, user, comments] = data.data;

    const isAdmin = session?.user ? session.user.name === user.name : false;

    const img_src = (user?.pictureUli) ? user.pictureUli : "/images/profile_picture/default.jpg";
    const post_picture = (post?.pictureUli) ? post.pictureUli : "/images/post_picture/default.jpg";
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = new Date(post.date);
    const date_text = `${months[date.getMonth()]} ${date.getDate()}`;
    const text_array = post?.body ? post?.body.replaceAll(":\n", ":\n\n").split("\n") : [];
    let i = 0;


    return (
        <main className="flex w-full p-6 justify-center ">
            <section className="flex flex-col bg-bg-200/60 w-2/3 rounded-2xl gap-4 shadow-2xl shadow-black">
                <Image className="h-96 object-cover rounded-t-2xl" width="1280" height="100" src={post_picture}
                       alt={post?.title + ""}/>
                <div className="flex">
                    <Link href={"/user/" + user?.name}>
                        <div
                            className="hover:scale-105 transition-all flex items-center gap-2 mx-16 hover:bg-bg-300/20 hover:cursor-pointer py-2 px-4 w-fit rounded-2xl">
                            <Image className="rounded-full" width="40" height="40" src={img_src}
                                   alt={user?.name + " profile picture"}/>
                            <div>
                                <p className="font-semibold text-md">{user?.name}</p>
                                <p className="font-semibold text-sm text-primary-200">Posted on {date_text}</p>
                            </div>
                        </div>
                    </Link>
                    {isAdmin ?
                        <div className="ml-auto mr-8 flex items-center gap-4">
                            <Link href={`/user/${post.slug}/settings`}
                                  className="hover:scale-105 transition-all  rounded-lg border-accent-glow-500 border-2 flex items-center p-2 px-4 gap-2 text-accent-glow-500 font-semibold hover:underline hover:bg-gradient-to-b from-accent-glow-500 to-accent-glow-500/80 hover:text-text-100 shadow-lg hover:shadow-accent-glow-500/60">
                                <Edit width='20'/>
                                <p>Edit Post</p>
                            </Link>
                            <button
                                  className="hover:scale-105 transition-all  rounded-lg border-accent-glow-100 border-2 flex items-center p-2 gap-2 text-accent-glow-100 font-semibold hover:underline hover:bg-gradient-to-b from-accent-glow-100 to-accent-glow-100/80 hover:text-text-100 shadow-lg hover:shadow-accent-glow-100/60">
                                <Trash2 width='20'/>
                            </button>

                        </div>
                        : <></>}
                </div>
                <h1 className="font-black text-6xl mx-16">{post?.title}</h1>
                <div className="flex gap-2 mx-16">
                    {
                        post?.tags.map((tag: string | null) => (
                            <Link key={tag} href={'/?filter=' + tag}>
                                <p className="hover:scale-105 transition-all font-light text-lg hover:font-normal hover:cursor-pointer hover:bg-bg-300/20 p-1 rounded-md px-2"
                                   key={tag}><span className="text-accent-glow-300">#</span>{tag}</p>
                            </Link>
                        ))
                    }
                </div>
                <div className="my-8 flex flex-col gap-4">
                    {text_array.map((line: string) => (
                        <p key={i++} className="mx-16 font-medium text-xl font-Synonym">
                            {line}
                        </p>
                    ))}
                </div>
                <div className="my-8 flex flex-col gap-8 mb-12">
                    <h2 className="mx-16 text-2xl font-semibold text-text-200">Comments</h2>
                    <FormPostComment post={post}/>
                    {comments.map((comment: {
                        body: string;
                        id: React.Key | null | undefined;
                    }) => (
                        <Comment key={comment.id} comment={comment}/>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Page;