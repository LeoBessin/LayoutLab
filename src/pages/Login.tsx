"use client"

import {useState} from "react"
import {useRouter} from "next/navigation"
import {signIn} from "next-auth/react"

const Login = () => {
    const router = useRouter()
    const [data, setData] = useState({
        name: '',
        password: ''
    })
    const loginUser = async (e: any) => {
        e.preventDefault()
        signIn('credentials', {
            ...data,
            redirect: false,
        }).then(authenticated => {
            router.push("/dashboard")
        }).catch((error) => {
            throw new Error(error)
        })

    }
    return (
        <div
            className="flex items-center justify-center h-[65vh] bg-bg-200/60 backdrop-blur-md z-30 my-20 mx-40 rounded-2xl">
            <section className=" w-1/2 h-full"></section>
            <section className="bg-bg-200 w-1/2 h-full rounded-2xl flex flex-col items-center p-12">
                <h1 className="text-2xl font-semibold">Welcome back ! 😍</h1>
                <form className="flex flex-col mt-8 gap-4 w-1/2" method="post" onSubmit={loginUser}>
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input value={data.name} onChange={(e) => {
                            setData({...data, name: e.target.value})
                        }} required={true} name="username" id="username" type="text" placeholder="00h37"
                               className="pt-2 px-2 pb-1 bg-transparent border-b focus:bg-transparent"/>
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="password" id="password">Password</label>
                        <input value={data.password} onChange={(e) => {
                            setData({...data, password: e.target.value})
                        }} required={true} name="password" id="password" type="password" placeholder="********"
                               className="pt-2 px-2 pb-1 bg-transparent border-b"/>
                    </div>
                    <div>
                        <button type="submit"
                                className="hover:cursor-pointer w-full p-2 rounded-2xl border-accent-glow-500 border-2 hover:bg-gradient-to-b from-accent-glow-500 to-accent-glow-500/80 text-accent-glow-500 hover:text-text-100 mt-4">
                            Log In
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Login;