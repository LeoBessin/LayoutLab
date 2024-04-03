import React from 'react';
import useSWR from "swr";
import fetcher from "@/src/api/fetch";
import moment from "moment/moment";
import Image from "next/image";
import Link from 'next/link'

// @ts-ignore
const Comment = ({comment}) => {
    const {data, error} = useSWR(`/api/user/id/${comment.userId}`, fetcher)

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>User dont exit</div>
    if (!data) return <div>Loading...</div>

    const user = data.data;
    const date_text = moment(comment.date).fromNow();
    const img_src = (user.pictureUli) ? user.pictureUli : "/images/profile_picture/default.jpg";
    return (
        <div className="mx-16 w-2/3 bg-bg-300/40 p-4 rounded-2xl shadow-2xl shadow-black/60">
            <Link href={"/user/" + user?.name}
                  className="flex items-center gap-2 hover:bg-bg-300/20 hover:cursor-pointer py-2 px-4 w-fit rounded-2xl">
                <Image className="rounded-full" width="40" height="40" src={img_src}
                       alt={user?.name + " profile picture"}/>
                <div>
                    <p className="font-semibold text-md">{user?.name}</p>
                    <p className="font-semibold text-sm text-primary-200">{date_text}</p>
                </div>
            </Link>
            <p className="mx-4 text-lg font-medium">{comment.body}</p>

        </div>
    );
};

export default Comment;