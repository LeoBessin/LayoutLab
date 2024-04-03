"use client";

import PostCard from "@/src/components/PostCard";
import useSWR from "swr";
import fetcher from '@/src/api/fetch';
import React from "react";
import Link from "next/link";
import {Bookmark, Eye, FileText, Heart, MessageCircle} from "react-feather"

// eslint-disable-next-line @next/next/no-async-client-component
const Page = ({searchParams}: { searchParams?: { [key: string]: string } }) => {
    //@ts-ignore
    let filter = searchParams["filter"] ? searchParams["filter"] : null;

    const {data, error} = useSWR(`/api/posts/${filter ? filter : "*"}`, fetcher)

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>There isnt post yet</div>
    if (!data) return <div>Loading...</div>

    function sortObj(obj: { [x: string]: any; }) {
        // Sort object as list based on values
        return Object.keys(obj).map(k => ([k, obj[k]])).sort((a, b) => (b[1] - a[1]))
    }

    const posts = data.data;

    const tagTrend = {};
    posts.forEach((post: { tags: string[]; }) => {
        if (post.tags) {
            post.tags.forEach((tag: string) => {
                // @ts-ignore
                if (tagTrend[tag]) {
                    // @ts-ignore
                    tagTrend[tag] += 1
                } else {
                    // @ts-ignore
                    tagTrend[tag] = 1
                }
            })
        }
    })

    const analytics = {
        comment: 0,
        like: 0,
        view: 0,
        save: 0,
        post: 0,
    };


    posts.forEach((post: { likes: string[], views: string[], saves: string[], comments: string[]; }) => {
        if (analytics.like) {
            analytics.like += post.likes.length
        } else {
            analytics.like = post.likes.length
        }

        if (analytics.view) {
            analytics.view += post.views.filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index).length
        } else {
            analytics.view = post.views.filter((value: any, index: any, array: string | any[]) => array.indexOf(value) === index).length
        }

        if (analytics.save) {
            analytics.save += post.saves.length
        } else {
            analytics.save = post.saves.length
        }

        if (analytics.comment) {
            analytics.comment += post.comments.length
        } else {
            analytics.comment = post.comments.length
        }

        if (analytics.post) {
            analytics.post += 1
        } else {
            analytics.post = 1
        }
    })

    const sortTagTrend = sortObj(tagTrend);

    return (
        <main className="flex w-full p-8 justify-center gap-8">
            <section className="flex flex-col w-1/5 h-fit bg-bg-200/60 rounded-2xl shadow-2xl shadow-black p-4 gap-4">
                <h2 className="font-semibold text-xl">Analytics</h2>
                <div className="flex flex-col gap-8 p-4">
                    <div className='flex items-center text-text-200 gap-2'>
                        <FileText/>
                        <p>{analytics.post} posts added</p>
                    </div>
                    <div className='flex items-center text-text-200 gap-2'>
                        <MessageCircle/>
                        <p>{analytics.comment} comments added</p>
                    </div>
                    <div className='flex items-center text-accent-glow-100 gap-2'>
                        <Heart/>
                        <p>{analytics.like} posts liked</p>
                    </div>
                    <div className='flex items-center text-text-100 gap-2'>
                        <Eye/>
                        <p>{analytics.view} posts read</p>
                    </div>
                    <div className='flex items-center text-[#FFCE20] gap-2'>
                        <Bookmark/>
                        <p>{analytics.save} posts saved</p>
                    </div>
                </div>
            </section>
            <section className="flex flex-col w-3/5">
                <div className="flex flex-col w-full gap-8">
                    {
                        // @ts-ignore
                        posts.map((post: { id: React.Key | null | undefined; }) => (
                            <PostCard key={post.id} post={post}/>
                        ))
                    }
                </div>
            </section>
            <section className="flex flex-col w-1/5 h-fit bg-bg-200/60 rounded-2xl shadow-2xl shadow-black p-4 gap-4">
                <h2 className="font-semibold text-xl">Tag trend</h2>
                <div className="flex flex-col gap-4 p-2">
                    {sortTagTrend.map((el) => (
                        <Link key={el[0]} href={'/dashboard?filter=' + el[0]}
                              className="hover:scale-105 transition-all  flex items-center hover:font-normal hover:cursor-pointer hover:bg-bg-300/20 p-1 rounded-md px-2 gap-2 font-light w-fit">
                            <p
                            ><span className="text-accent-glow-300">#</span>{el[0]}
                            </p>
                            <p className="text-primary-300 text-sm">({el[1]})</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
};

export default Page;