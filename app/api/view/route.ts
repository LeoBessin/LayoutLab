"use server"

import {NextRequest, NextResponse} from 'next/server'
import {prisma} from "@/src/db/prisma";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const userName = formData.get("userName") as string;
    const postSlug = formData.get("postSlug") as string;

    if (userName === "") return new NextResponse("User not connected", {status: 400})

    const exist = await prisma.user.findUnique({
        where: {
            name: userName
        }
    })

    if (!exist) return new NextResponse("User not founded", {status: 400})
    if (exist.postReaded.includes(postSlug)) return new NextResponse("Post already readed", {status: 400})

    const user = await prisma.user.update({
        where: {
            name: userName
        },
        data: {
            postReaded: {
                push: postSlug
            }
        }
    })

    const post = await prisma.post.update({
        where: {
            slug: parseInt(postSlug)
        },
        data: {
            views: {
                push: userName
            }
        }
    })


    return NextResponse.json("ok")
}
