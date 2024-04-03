"use client";

import React, {FormEvent, useState} from 'react';
import {PlusCircle} from "react-feather";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

// @ts-ignore
const FormPostComment = ({post}) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const {data: session, status} = useSession({
        required: true,
        onUnauthenticated() {
            // The user is not authenticated, handle it here.
            console.log("not authentificated");

        },
    })

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true) // Set loading to true when the request starts

        try {
            const formData = new FormData(event.currentTarget)
            const userName = session?.user ? session?.user.name : "";
            const postId = post ? post.id : "";
            // @ts-ignore
            formData.append("userName", userName)
            formData.append("postId", postId)

            const response = await fetch('/api/comment', {
                method: 'POST',
                body: formData,
            })

            // Handle response if necessary
            const data = await response.json()
            window.location.reload()
            // ...
        } catch (error) {
            // Handle error if necessary
            console.error(error)
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
            window.location.reload()
        }
    }

    return (
        <form className="mx-16 flex flex-col w-2/3  bg-bg-300/40 p-4 rounded-2xl shadow-2xl shadow-black/60 gap-4"
              onSubmit={onSubmit}>
            <textarea required={true} name="body" id="body" placeholder="Add to the discussion"
                      className="w-full bg-white/5 p-2 rounded-xl text-lg h-24 min-h-12 font-normal font-Synonym"/>
            <button type='submit'
                    className="hover:scale-105 transition-all self-start border-accent-glow-500 border-2 hover:underline hover:bg-gradient-to-b from-accent-glow-500 to-accent-glow-500/80 text-accent-glow-500 hover:text-text-100 px-4 py-2 rounded-2xl shadow-lg hover:shadow-accent-glow-500/60 text-center font-normal hover:cursor-pointer flex gap-2 text-md justify-center items-center">
                <PlusCircle size={20}/>
                {isLoading ? 'Loading...' : 'Submit'}
            </button>
        </form>
    );
};

export default FormPostComment;