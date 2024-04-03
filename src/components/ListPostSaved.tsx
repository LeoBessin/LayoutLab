import React from 'react';
import useSWR from "swr";
import fetcher from "@/src/api/fetch";
import {useSession} from "next-auth/react";
import Link from 'next/link';
import Image from "next/image";

const ListPostSaved = () => {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log("not authentificated");

        },
    })

    const userName = session?.user ? session.user.name : "";

    const {data, error} = useSWR(`/api/posts/saved/${userName}`, fetcher)

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>There isnt post yet</div>
    if (!data) return <div>Loading...</div>
    const posts = data.data;
    if (!posts[0]) return (
        <div
            className="bg-bg-200/95 absolute p-4 rounded-2xl w-72 -right-12 shadow-black/60 shadow-lg flex flex-col gap-4">
            <p>No post saved</p>
        </div>
    )
    return (
        <div
            className="bg-bg-200/95 absolute p-4 rounded-2xl w-72 -right-12 shadow-black/60 shadow-lg flex flex-col gap-4">
            {posts.map((post: {
                pictureUli: string;
                slug: number;
                title: string;
                id: React.Key | null | undefined;
            }) => (
                <Link className="p-2 px-4 bg-bg-300/60 rounded-xl flex gap-2" href={`/post/${post.slug}`} key={post.id}>
                    <p className="font-medium text-xs">{post.title}</p>
                    <Image className="rounded-md" width="50" height='50'
                           src={post.pictureUli ? post.pictureUli : "/images/post_picture/default.jpg"}
                           alt="Post image"/>
                </Link>
            ))}
        </div>
    );
};

export default ListPostSaved;