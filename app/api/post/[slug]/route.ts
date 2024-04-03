import {NextRequest, NextResponse} from "next/server"
import {prisma} from "@/src/db/prisma";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req: NextRequest, context: { params: { slug: number } }) {
    if (!context.params.slug) return NextResponse.json({message: "Slug not provided", status: 400})
    const slug = context.params.slug ? parseInt(String(context.params.slug)) : 0;
    const exist = await prisma.post.findUnique({
        where: {
            slug: slug
        }
    })

    if (exist) {
        const user = await prisma.user.findUnique({
            where: {
                id: exist.userId
            }
        })

        const comments = await prisma.comment.findMany({
            orderBy: {
                date: "desc"
            },
            where: {
                postId: exist.id
            }
        })

        return NextResponse.json({message: "ok", status: 200, data: [exist, user, comments]})
    }
    return NextResponse.json({message: "Post dont exists", status: 400})
}