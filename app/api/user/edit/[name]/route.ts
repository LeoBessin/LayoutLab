"use server"

import {NextRequest, NextResponse} from 'next/server'
import {writeFile} from "fs/promises";
import path from "path";
import {prisma} from "@/src/db/prisma";
import mime from 'mime';

export async function POST(request: NextRequest, context: { params: { name: string } }) {
    const formData = await request.formData();
    const location = formData.get("location") as string;
    const description = formData.get("description") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as File || null;
    const name = context.params.name ? context.params.name : null;

    if (!name) return NextResponse.json({message: "Name not provided", status: 400})


    const user = await prisma.user.findUnique({
        where: {
            name: context.params.name
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

            const valid = await prisma.user.update({
                where: {
                    id: userId
                },
                data: {
                    location: location,
                    description: description,
                    email: email,
                    pictureUli: imageUli
                }
            })


            return NextResponse.json(valid)

        } catch (e) {
            return NextResponse.json({message: "Something goes wrong", status: 400})
        }

    } else {

        const valid = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                location: location,
                description: description,
                email: email
            }
        })


        return NextResponse.json(valid)
    }
}
