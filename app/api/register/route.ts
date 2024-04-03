import bcrypt from 'bcrypt'
import {NextResponse} from 'next/server'
import {prisma} from "@/src/db/prisma";

export async function POST(request: { json: () => any; }) {
    const body = await request.json();
    const {name, email, password} = body.data;

    if (!name || !email || !password) {
        return new NextResponse("Missing name,email or password", {status: 400})
    }

    const exist = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (exist) {
        return new NextResponse("User already exists", {status: 400})

    }

    const hashedPassword = await bcrypt.hash(password, 10)


    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            hashedPassword: hashedPassword,
            posts: [],
            comments: [],
            postSaved: [],
            postLiked: [],
            postReaded: [],
            description: null,
            location: null,
            pictureUli: null,
            isAdmin: false
        }
    })


    return NextResponse.json(user)
}