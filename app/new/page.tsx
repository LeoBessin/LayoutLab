"use client";

import React, {FormEvent, useState} from 'react';
import {PlusCircle} from "react-feather";
import useTags from "@/src/components/Form/Hook/useTagInput"
import {TagField} from '@/src/components/Form/TagField'
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";

const Page = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const MAX_TAGS = 3;
    const {tags, handleAddTag, handleRemoveTag} = useTags(MAX_TAGS);
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
            tags.forEach(tag => {
                // @ts-ignore
                formData.append("tags", tag.replaceAll(" ", ""))

            })
            const userName = session?.user ? session.user.name : "";
            // @ts-ignore
            formData.append("name", userName)

            const response = await fetch('/api/post/create', {
                method: 'POST',
                body: formData,
            })

            // Handle response if necessary
            const data = await response.json()
            router.push("/dashboard")
            // ...
        } catch (error) {
            // Handle error if necessary
            console.error(error)
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
        }
    }

    if (!session?.user) {
        router.push("/enter")
    } else {

        return (
            <main className="flex flex-col justify-center items-center">
                <form onSubmit={onSubmit}
                      className="bg-bg-200/60 w-2/3 flex flex-col justify-center items-center rounded-2xl gap-8 shadow-2xl shadow-black p-16 m-24">
                    <div className="mx-40 flex flex-col w-2/3">
                        <label
                            className="text-primary-300 mx-2 text-center font-normal flex gap-2 text-md items-center">
                            Add a cover image
                        </label>
                        <input type='file' accept="image/*" name="image"
                               className="text-sm text-primary-300 p-2 hover:cursor-pointer bg-transparent  focus:outline-none"/>


                    </div>
                    <textarea required={true} name="title" id="title" placeholder="New post title here..."
                              className="w-2/3 p-2 bg-transparent text-2xl h-12 min-h-12 font-bold "/>

                    <TagField
                        tags={tags}
                        addTag={handleAddTag}
                        removeTag={handleRemoveTag}
                        maxTags={MAX_TAGS}
                    />
                    <textarea required={true} name="body" id="body" placeholder="Write your post content here..."
                              className="w-2/3 bg-white/5 p-2 rounded-xl text-lg h-64 min-h-12 font-normal font-Synonym"/>

                    <button type='submit'
                            className="transition-all self-start mx-40 border-accent-glow-500 border-2 hover:underline hover:bg-gradient-to-b from-accent-glow-500 to-accent-glow-500/80 text-accent-glow-500 hover:text-text-100 px-4 py-2 rounded-2xl shadow-lg hover:shadow-accent-glow-500/60 text-center font-normal hover:cursor-pointer flex gap-2 text-md justify-center items-center">
                        <PlusCircle size={20}/>
                        {isLoading ? 'Loading...' : 'Publish'}
                    </button>

                </form>

            </main>
        );
    }
};

export default Page;