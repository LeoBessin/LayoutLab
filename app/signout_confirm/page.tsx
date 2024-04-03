"use client"

import {useRouter} from "next/navigation"
import {signOut} from "next-auth/react"

const Page = () => {
    const router = useRouter()
    const logoutUser = async (e: any) => {
        e.preventDefault()
        signOut({
            redirect: false,
        }).then(() => {
            router.push("/enter?state=new-user")
        }).catch((error) => {
            throw new Error(error)
        })
    }
    return (
        <main className='flex items-center justify-center h-96'>
            <form onSubmit={logoutUser}
                  className="w-2/3 bg-bg-200/60 shadow-2xl shadow-black rounded-2xl flex flex-col items-center justify-center py-16 gap-16 px-8">
                <h2 className="font-bold text-3xl text-center">Are you sure you want to log out?</h2>
                <button type='submit'
                        className="w-fit border-accent-glow-100 border-2 hover:underline hover:bg-gradient-to-b from-accent-glow-100 to-accent-glow-100/80 text-accent-glow-100 hover:text-text-100 px-4 py-2 rounded-2xl shadow-lg hover:shadow-accent-glow-100/60 text-center font-normal hover:cursor-pointer flex gap-2 text-md justify-center items-center">
                    Yes, log out
                </button>
            </form>
        </main>
    );
};

export default Page;