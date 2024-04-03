"use client";

import React, {FormEvent, useEffect, useState} from 'react';
import Image from "next/image";
import Link from 'next/link'
import {Bookmark, Eye, EyeOff, Heart, MessageCircle} from "react-feather";
import useSWR from "swr";
import fetcher from "@/src/api/fetch";
import moment from "moment";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

// @ts-ignore
const PostCard = ({post}) => {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log("not authentificated");

        },
    })
    const [nbLike, setNbLike] = useState(post.likes.length);
    const {data, error} = useSWR(`/api/user/id/${post.userId}`, fetcher)
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isReaded, setisReaded] = useState(false);
    const router = useRouter();


    async function handleLike(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const formData = new FormData(event.currentTarget)
            const userName = session?.user ? session.user.name : "";
            const postId = post ? post.id : "";
            // @ts-ignore
            formData.append("userName", userName)
            formData.append("postId", postId)

            const response = await fetch('/api/like', {
                method: 'POST',
                body: formData,
            })

            // Handle response if necessary
            const data = await response.json()
            setIsLiked(!isLiked)
            setNbLike(isLiked ? nbLike - 1 : nbLike + 1)
            // ...
        } catch (error) {
            // Handle error if necessary
            console.error(error)
        }
    }

    async function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        try {
            const formData = new FormData(event.currentTarget)
            const userName = session?.user ? session.user.name : "";
            const postId = post ? post.id : "";
            // @ts-ignore
            formData.append("userName", userName)
            formData.append("postId", postId)

            const response = await fetch('/api/save', {
                method: 'POST',
                body: formData,
            })

            // Handle response if necessary
            const data = await response.json()
            setIsSaved(!isSaved)
        } catch (error) {
            // Handle error if necessary
            console.error(error)
        }
    }

    useEffect(() => {
        setIsLiked(post.likes.includes(session?.user?.name))
        setIsSaved(post.saves.includes(session?.user?.name))
        setisReaded(post.views.includes(session?.user?.name))
    }, []);

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>User dont exit</div>
    if (!data) return <div>Loading...</div>

    const postUser = data.data;

    // @ts-ignore
    const img_src = (postUser.pictureUli) ? postUser.pictureUli : "/images/profile_picture/default.jpg";

    const date_text = moment(post.date).fromNow();
    const post_picture = (post.pictureUli) ? post.pictureUli : "/images/post_picture/default.jpg";
    const nb_comment = post.comments ? post.comments.length : 0;
    const nb_views = post.views ? post.views.filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index).length : 0;
    const average_wpm = 130;
    const nb_words = Math.round(post.body.split(" ").length / average_wpm);
    const link = "/post/" + post.slug;


    return (
        <div className="w-full bg-bg-200/60 flex flex-col px-16 py-8 rounded-2xl gap-4 shadow-2xl shadow-black">
            <Link href={`/user/${postUser?.name}`}>
                <div
                    className="hover:scale-105 transition-all flex gap-2 items-center hover:bg-bg-300/20 hover:cursor-pointer py-2 px-4 rounded-2xl w-fit">
                    <Image className="rounded-full" width="30" height="30" src={img_src}
                           alt={`${postUser?.name} profile picture`}/>
                    <p className="text-sm font-normal">{postUser?.name}</p>
                </div>

            </Link>
            <Link href={link}>
                <h1 className="font-black text-3xl w-3/5 hover:cursor-pointer hover:text-text-200">{post.title}</h1>
            </Link>
            <div className="flex gap-2">
                {
                    post.tags.map((tag: string | null) => (
                        <Link key={tag} href={'/dashboard?filter=' + tag}>
                            <p className="hover:scale-105 transition-all font-light hover:font-normal hover:cursor-pointer hover:bg-bg-300/20 p-1 rounded-md px-2"
                            ><span className="text-accent-glow-300">#</span>{tag}
                            </p>
                        </Link>
                    ))
                }
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-primary-200 font-semiboldbold">{date_text}</p>
                <Link href={link}>
                    <Image className="hover:opacity-95 rounded-2xl hover:cursor-pointer h-96 object-cover" width="720"
                           height="720" src={post_picture} alt={post.title}/>
                </Link>
            </div>
            <div className="flex items-center mx-8 mt-2 gap-4">
                <form className='flex items-center gap-2 hover:cursor-pointer hover:scale-105 transition-all '
                      onClick={handleLike}>
                    <Heart
                        className={isLiked ? "fill-accent-glow-100 hover:fill-transparent" : "hover:fill-accent-glow-100"}
                        color="#f24e1e"/>
                    <p className="text-accent-glow-100 font-semibold">{nbLike}</p>
                </form>
                <Link href={link}>
                    <div className='flex items-center gap-2 hover:cursor-pointer hover:scale-105 transition-all '>
                        <MessageCircle className="hover:fill-text-200" color="#e0e0e0"/>
                        <p className="text-text-200 font-semibold ">{nb_comment}</p>
                    </div>
                </Link>
                <form className='flex items-center gap-2 hover:cursor-pointer hover:scale-105 transition-all '
                      onClick={handleSave}>
                    <Bookmark className={isSaved ? "fill-[#FFCE20] hover:fill-transparent" : "hover:fill-[#FFCE20]"}
                              color="#FFCE20"/>
                </form>
                <div className="ml-auto flex items-center gap-4">
                    <p className="text-primary-200">{nb_words} min read</p>
                    <div className='flex items-center gap-2'>
                        {isReaded ? <Eye color="#5c5c5c"/> : <EyeOff width="20" color="#5c5c5c"/>}

                        <p className="text-primary-200 font-semibold">{nb_views}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostCard;