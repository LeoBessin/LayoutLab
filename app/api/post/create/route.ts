"use server"

import {NextRequest, NextResponse} from 'next/server'
import {writeFile} from "fs/promises";
import path from "path";
import {prisma} from "@/src/db/prisma";
import moment from "moment/moment";
import mime from 'mime';

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    const title = formData.get("title") as string;
    const body = formData.get("body") as string;
    const image = formData.get("image") as File || null;
    const name = formData.get("name") as string;
    const tags = formData.getAll("tags") as string[] || null;
    const lastPost = await prisma.post.findFirst({
        orderBy: {
            slug: "desc"
        }
    })

    const slug = lastPost ? lastPost.slug + 1 : 0;
    const date = moment();

    const user = await prisma.user.findUnique({
        where: {
            name: name
        }
    })

    const userId = user ? user.id : "";

    if (image?.size !== 0) {

        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

        const imageUli = `/images/post_picture/${new Date(Date.now())
            .toLocaleDateString("id-ID", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
            })
            .replace(/\//g, "-")}-${uniqueSuffix}.${mime.getExtension(image.type)}`;
        const buffer = Buffer.from(await image.arrayBuffer());
        try {
            await writeFile(
                path.join(process.cwd(), "public/" + imageUli),
                buffer
            );


            const post = await prisma.post.create({
                data: {
                    title: title,
                    slug: slug,
                    body: body,
                    date: date.toISOString(),
                    userId: userId,
                    pictureUli: imageUli,
                    tags: tags
                }
            })

            const valid = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    posts: {
                        push: post.id
                    }
                }
            })


            return NextResponse.json(post)

        } catch (e) {
            return NextResponse.json({message: "Something goes wrong", status: 400})
        }

    } else {
        const post = await prisma.post.create({
            data: {
                title: title,
                slug: slug,
                body: body,
                date: date.toISOString(),
                userId: userId,
                pictureUli: "",
                tags: tags
            }
        })

        const valid = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                posts: {
                    push: post.id
                }
            }
        })


        return NextResponse.json(post)
    }
}
