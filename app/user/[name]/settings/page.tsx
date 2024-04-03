"use client";

import React, {FormEvent, useEffect, useState} from 'react';
import useSWR from "swr";
import fetcher from "@/src/api/fetch";
import {useSession} from "next-auth/react";
import {useRouter} from "next/navigation";
import {Edit} from "react-feather";

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
    const router = useRouter()
    const {data, error} = useSWR(`/api/user/${params.name}`, fetcher)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userLocation, setUserLocation] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userDescription, setUserDescription] = useState("")

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setIsLoading(true) // Set loading to true when the request starts

        try {
            const formData = new FormData(event.currentTarget)
            const userName = session?.user ? session.user.name : "";

            const response = await fetch(`/api/user/edit/${userName}`, {
                method: 'POST',
                body: formData,
            })

            // Handle response if necessary
            const data = await response.json()
            router.push(`/user/${params.name}`)
            // ...
        } catch (error) {
            // Handle error if necessary
            console.error(error)
        } finally {
            setIsLoading(false) // Set loading to false when the request completes
        }
    }

    useEffect(() => {
        if (params.name != session?.user?.name) {
            router.push(`/user/${params.name}`)
        } else {
            setUserLocation(user.location ? user.location : "")
            setUserEmail(user.email ? user.email : "")
            setUserDescription(user.description ? user.description : "")
        }
    }, []);

    if (error) return <div>Failed to load</div>

    if (!data?.data) return <div>User dont exit</div>
    if (!data) return <div>Loading...</div>
    const user = data.data;
    return (
        <main className="mb-16 w-full backdrop-blur-2xl flex flex-col gap-8 items-center p-8">
            <section className="bg-bg-200/60 flex flex-col shadow-black shadow-2xl w-3/5 rounded-2xl p-8 gap-4">
                <h1 className="text-4xl font-bold">@{user.name}</h1>
                <div className="w-full h-1 bg-bg-300/60 rounded-full"></div>
                <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <h2 className="text-3xl font-semibold">Edit</h2>
                    <div className="flex flex-col justify-center items-center">
                        <label
                            className="text-xl font-semibold">
                            Profile image
                        </label>
                        <input type='file' accept="image/*" name="image"
                               className="text-sm text-primary-300 p-2 hover:cursor-pointer bg-transparent  focus:outline-none"/>

                    </div>
                    <div className="flex items-center justify-around">
                        <div className="flex flex-col">
                            <label htmlFor="location" className="text-xl font-semibold">Location</label>
                            <input onChange={(e) => setUserLocation(e.target.value)} type="text" value={userLocation}
                                   name="location" id="location"
                                   className="pt-2 px-2 pb-1 bg-transparent border-b focus:bg-transparent text-text-200"/>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-xl font-semibold">Email</label>
                            <input onChange={(e) => setUserEmail(e.target.value)} type="email" value={userEmail}
                                   name="email" id="email"
                                   className="pt-2 px-2 pb-1 bg-transparent border-b focus:bg-transparent text-text-200"/>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="flex flex-col w-full justify-center items-center">
                            <label htmlFor="description" className="text-xl font-semibold">Description</label>
                            <textarea onChange={(e) => setUserDescription(e.target.value)} value={userDescription}
                                      name="description" id="description"
                                      className="w-2/3 bg-white/5 p-2 rounded-xl text-lg h-64 min-h-12 font-normal"/>
                        </div>
                    </div>
                    <button type='submit'
                            className="hover:scale-105 transition-all  border-accent-glow-500 border-2 hover:underline hover:bg-gradient-to-b from-accent-glow-500 to-accent-glow-500/80 text-accent-glow-500 hover:text-text-100 px-4 py-2 rounded-2xl shadow-lg hover:shadow-accent-glow-500/60 text-center font-normal hover:cursor-pointer flex gap-2 text-md justify-center items-center w-2/3 self-center mt-12">
                        <Edit size={20}/>
                        {isLoading ? 'Loading...' : 'Save Profile Information'}
                    </button>
                </form>

            </section>
        </main>
    );
};

export default Page;