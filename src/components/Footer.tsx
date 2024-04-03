import React from 'react';
import Image from "next/image";

const Footer = () => {
    return (
        <footer className="w-full mt-8 rounded-t-2xl shadow-2xl shadow-black flex flex-col justify-center px-32 py-4">
            <section className="flex w-full gap-16 mb-16">
                <div className="w-3/5 flex flex-col gap-4">
                    <Image width="175" height="50" src="/images/big-logo.svg" alt="layout lab logo"/>
                    <p className="text-sm pr-64 text-text-200">Welcome to our web design blog, where we share our
                        passion for creating stunning and functional websites. Our team of experienced designers and
                        developers provide innovative web design solutions tailored to meet the unique needs of each
                        client.</p>
                </div>
                <div className="w-1/5 flex flex-col gap-8">
                    <h2 className="text-lg font-normal">Stack</h2>
                    <ul className="text-text-200 flex flex-col gap-4">
                        <li className="hover:underline hover:cursor-pointer"><a target="_blank"
                                                                                href='https://nextjs.org/'>NextJs</a>
                        </li>
                        <li className="hover:underline hover:cursor-pointer"><a target="_blank"
                                                                                href='https://tailwindcss.com/'>TailwindCss</a>
                        </li>
                        <li className="hover:underline hover:cursor-pointer"><a target="_blank"
                                                                                href='https://www.prisma.io/'>Prisma</a>
                        </li>
                        <li className="hover:underline hover:cursor-pointer"><a target="_blank"
                                                                                href='https://www.mongodb.com/'>MongoDb</a>
                        </li>
                    </ul>
                </div>
                <div className="w-1/5 flex flex-col gap-8">
                    <h2 className="text-lg">Info</h2>
                    <ul className="text-text-200 flex flex-col gap-4">
                        <li className="hover:underline hover:cursor-pointer"><a target="_blank"
                                                                                href='https://www.leo-bessin.dev/'>Me
                            (Léo)</a>
                        </li>
                        <li className="hover:underline hover:cursor-pointer"><a target="_blank"
                                                                                href='https://github.com/LeoBessin'>GitHub</a>
                        </li>
                        <li className="hover:underline hover:cursor-pointer"><a target="_blank"
                                                                                href='https://www.linkedin.com/in/l%C3%A9o-bessin/'>LinkedIn</a>
                        </li>
                    </ul>
                </div>
            </section>
            <div className="w-full h-1 bg-bg-200/60 rounded-full"></div>
            <section className="flex pt-8 pb-16">
                <p className="text-primary-300">Copyright ©️ 2023 Layout Lab. All right reserved.</p>
                <p className="text-primary-300 ml-auto font-semibold">Site coded and designed with 💖</p>
            </section>
        </footer>
    );
};

export default Footer;