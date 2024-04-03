import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import NavBar from "@/src/components/NavBar/NavBar";
import Footer from "@/src/components/Footer";
import Provider from '@/context/Provider';

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "Layout Lab",
    description: "Create websites that engage, inspire, and convert.",
    icons: {
        icon: '/images/favicon.ico', // /public path
    },
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <Provider session>
            <body className="bg-bg-100 text-text-100 font-DmSans bg-gradient from-accent-glow-300 to-accent-glow-500">
            <NavBar></NavBar>
            <div className="w-full h-full fixed -z-10 overflow-hidden flex justify-center">
                <div
                    className="w-1/3 h-1/2 bg-accent-glow-100/20 relative top-1/4 rounded-full blur-[200px] -z-10"></div>
                <div
                    className="w-1/3 h-1/2 bg-accent-glow-300/20 relative top-1/4 rounded-full blur-[200px] -z-10"></div>

            </div>
            {children}
            <Footer/>
            </body>
        </Provider>
        </html>
    );
}
