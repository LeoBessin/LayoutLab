import Image from "next/image";
import Link from "next/link";
import {Feather, GitHub, LogIn, Triangle, Wind, Edit} from "react-feather"

export default async function home() {


    return (
        <main className="flex flex-col w-full p-16 justify-center gap-8">
            <section className="flex">
                <section className="w-1/2 h-96 flex flex-col items-center justify-center gap-4">
                    <h2 className="font-black text-7xl w-4/5 text-text-100">Create <span
                        className="bg-gradient-to-r from-accent-glow-100 to-accent-glow-200 text-transparent bg-clip-text">websites</span> that <span
                        className="bg-gradient-to-r from-accent-glow-300 to-accent-glow-400 text-transparent bg-clip-text">engage</span>, <span
                        className="bg-gradient-to-r from-accent-glow-400 to-accent-glow-500 text-transparent bg-clip-text">inspire</span>,
                        and <span
                            className="bg-gradient-to-r from-accent-glow-500 to-[#84CF0A] text-transparent bg-clip-text">convert</span>.
                    </h2>
                    <Link href="enter"
                          className="self-start mx-16 border-accent-glow-300 border-2 hover:scale-105 transition-all bg-gradient-to-b from-accent-glow-300 to-accent-glow-300/80 text-text-100 px-4 py-2 rounded-2xl shadow-lg shadow-accent-glow-300/60 text-center font-normal hover:cursor-pointer flex gap-2 text-lg justify-center items-center">
                        <LogIn/>
                        <p>Sign in</p>
                    </Link>
                </section>
                <section className="w-1/2 h-96 flex relative items-center justify-center">
                    <Image width="250"
                           height="250" src="/images/ChartIncreasing.png" alt="ChartIncreasing"
                           className="rotate-12 absolute -bottom-10 left-20"/>
                    <Image width="250"
                           height="250" src="/images/MagnifyingGlassTiltedLeft.png" alt="ChartIncreasing"
                           className="rotate-6 absolute opacity-90 top-0 right-40"/>
                </section>

            </section>
            <section className="flex flex-wrap w-1/3 gap-4 justify-center self-center my-16">
                <a target="_blank" href="https://leo-bessin.dev"
                   className="p-2 px-4 rounded-2xl flex items-center text-black gap-2 hover:scale-105 transition-all bg-gradient-to-b from-accent-glow-100 to-accent-glow-100/80 font-semibold shadow-lg shadow-accent-glow-100/60 ">
                    <GitHub/>
                    <p>Léo Bessin</p>
                </a>
                <a target="_blank" href="https://www.figma.com/fr/"
                   className="p-2 px-4 rounded-2xl flex items-center text-black gap-2 hover:scale-105 transition-all bg-gradient-to-b from-accent-glow-200 to-accent-glow-200/80 font-semibold shadow-lg shadow-accent-glow-200/60 ">
                    <Edit/>
                    <p>Figma</p>
                </a>
                <a target="_blank" href="https://nextjs.org/"
                   className="p-2 px-4 rounded-2xl flex items-center text-black gap-2 hover:scale-105 transition-all bg-gradient-to-b from-accent-glow-300 to-accent-glow-300/80 font-semibold shadow-lg shadow-accent-glow-300/60 ">
                    <Triangle className="fill-black"/>
                    <p>NextJs</p>
                </a>
                <a target="_blank" href="https://tailwindcss.com/"
                   className="p-2 px-4 rounded-2xl flex items-center text-black gap-2 hover:scale-105 transition-all bg-gradient-to-b from-accent-glow-400 to-accent-glow-400/80 font-semibold shadow-lg shadow-accent-glow-400/60 ">
                    <Wind/>
                    <p>TailwindCss</p>
                </a>
                <a target="_blank" href="https://www.mongodb.com/fr-fr"
                   className="p-2 px-4 rounded-2xl flex items-center text-black gap-2 hover:scale-105 transition-all bg-gradient-to-b from-accent-glow-500 to-accent-glow-500/80 font-semibold shadow-lg shadow-accent-glow-500/60 ">
                    <Feather/>
                    <p>MongoDb</p>
                </a>
            </section>
        </main>
    )
}
