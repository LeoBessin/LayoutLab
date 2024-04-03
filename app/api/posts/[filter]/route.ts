import {NextRequest, NextResponse} from "next/server"
import {prisma} from "@/src/db/prisma";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req: NextRequest, context: { params: { filter: string } }) {
    const filter = context.params.filter ? context.params.filter : null;
    const data = filter === "*" ? await prisma.post.findMany({
        orderBy: {
            date: "desc"
        }
    }) : await prisma.post.findMany({
        orderBy: {
            date: "desc"
        },
        where: {
            tags: {
                has: filter
            }
        }
    })

    if (data) {
        return NextResponse.json({message: "ok", status: 200, data: data})
    }
    return NextResponse.json({message: "User dont exists", status: 400})
}