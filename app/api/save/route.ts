"use server"

import {NextRequest, NextResponse} from 'next/server'
import {prisma} from "@/src/db/prisma";

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const userName = formData.get("userName") as string;
    const postId = formData.get("postId") as string;

    if (userName === "") return new NextResponse("User not connected", {status: 400})

    const existUser = await prisma.user.findUnique({
        where: {
            name: userName
        },
    })

    if (!existUser || existUser.postSaved.includes(postId)) {

        const existPost = await prisma.post.findUnique({
            where: {
                id: postId
            },
        })

        // @ts-ignore
        const list_user = existUser.postSaved.filter(function (id) {
            return id !== postId;
        });

        // @ts-ignore
        const list_post = existPost.saves.filter(function (name) {
            return name !== userName;
        });


        const user = await prisma.user.update({
            where: {
                name: userName
            },
            data: {
                postSaved: list_user
            }
        })

        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                saves: list_post
            }
        })

    } else {

        const user = await prisma.user.update({
            where: {
                name: userName
            },
            data: {
                postSaved: {
                    push: postId
                }
            }
        })

        const post = await prisma.post.update({
            where: {
                id: postId
            },
            data: {
                saves: {
                    push: userName
                }
            }
        })

    }


    return NextResponse.json("ok")
}
