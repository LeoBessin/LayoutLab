"use server"

import {NextRequest, NextResponse} from 'next/server'
import {prisma} from "@/src/db/prisma";
import moment from "moment/moment";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const userName = formData.get("userName") as string;
    const postId = formData.get("postId") as string;
    const body = formData.get("body") as string;

    if (userName === "") return new NextResponse("User not connected", {status: 400})

    const date = moment();

    const user = await prisma.user.findUnique({
        where: {
            name: userName
        }
    })

    const userId = user ? user.id : "";

    const comment = await prisma.comment.create({
        data: {
            userId: userId,
            postId: postId,
            body: body,
            date: date.toISOString()
        }
    })

    const post = await prisma.post.update({
        where: {
            id: postId
        },
        data: {
            comments: {
                push: comment.id
            }
        }
    })

    const exist = await prisma.user.update({
        where: {
            name: userName
        },
        data: {
            comments: {
                push: comment.id
            }
        }
    })


    return NextResponse.json(comment)
}
