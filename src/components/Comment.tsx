import React from 'react';
import useSWR from "swr";
import fetcher from "@/src/api/fetch";
import moment from "moment/moment";
import Image from "next/image";
import Link from 'next/link'
import {useSession} from "next-auth/react";
import {Trash2} from "react-feather";

// @ts-ignore
const Comment = ({comment}) => {
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log("not authentificated");

        },
    })
    const {data, error} = useSWR(`/api/user/id/${comment.userId}`, fetcher)

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>User dont exit</div>
    if (!data) return <div>Loading...</div>

    const user = data.data;
    const isAdmin = session?.user ? session.user.name === user.name : false;
    const date_text = moment(comment.date).fromNow();
    const img_src = (user.pictureUli) ? user.pictureUli : "/images/profile_picture/default.jpg";
    return (
        <div className="mx-16 w-2/3 bg-bg-300/40 p-4 rounded-2xl shadow-2xl shadow-black/60">
            <div className="flex items-center">
                <Link href={"/user/" + user?.name}
                      className="flex items-center gap-2 hover:bg-bg-300/20 hover:cursor-pointer py-2 px-4 w-fit rounded-2xl">

                    <Image className="rounded-full" width="40" height="40" src={img_src}
                           alt={user?.name + " profile picture"}/>
                    <div>
                        <p className="font-semibold text-md">{user?.name}</p>
                        <p className="font-semibold text-sm text-primary-200">{date_text}</p>
                    </div>
                </Link>{isAdmin ?
                <div className="ml-auto mr-8 flex items-center gap-4">
                    <button
                          className="hover:scale-105 transition-all  rounded-lg border-accent-glow-100 border-2 flex items-center p-2 gap-2 text-accent-glow-100 font-semibold hover:underline hover:bg-gradient-to-b from-accent-glow-100 to-accent-glow-100/80 hover:text-text-100 shadow-lg hover:shadow-accent-glow-100/60">
                        <Trash2 width='20'/>
                    </button>

                </div>
                : <></>}

            </div>
            <p className="mx-4 text-lg font-medium">{comment.body}</p>

        </div>
    );
};

export default Comment;