import {prisma} from '@/src/db/prisma';
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {randomBytes, randomUUID} from "node:crypto";

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                name: {label: 'Name', type: 'text', placeholder: 'your name'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {

                //  Check to see if email and password are valid
                if (!credentials?.name || !credentials.password) {
                    return null
                }

                // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        name: credentials.name
                    }
                })

                if (!user) {
                    return null
                }

                // check to see if passwords match
                const passwordsMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!passwordsMatch) {
                    return null;
                }

                // return user object
                return user;
            }
        })
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours,
        generateSessionToken: () => {
            return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development'
};

// @ts-ignore
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
