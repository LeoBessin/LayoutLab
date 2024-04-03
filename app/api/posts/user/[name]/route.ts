import {NextRequest, NextResponse} from "next/server"
import {prisma} from "@/src/db/prisma";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req: NextRequest, context: { params: { name: string } }) {
    const name = context.params.name ? context.params.name : null;
    if (!name) return NextResponse.json({message: "Name not provided", status: 400})
    const user = await prisma.user.findUnique({
        where: {
            name: name
        }
    })
    if (!user) return NextResponse.json({message: "User dont exists", status: 400})
    const posts = await prisma.post.findMany({
        orderBy: {
            date: "desc"
        },
        where: {
            userId: user.id
        }
    })

    if (posts) {
        return NextResponse.json({message: "ok", status: 200, data: [user, posts]})
    }
    return NextResponse.json({message: "User dont exists", status: 400})
}