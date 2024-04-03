import {NextRequest, NextResponse} from "next/server"
import {prisma} from "@/src/db/prisma";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req: NextRequest, context: { params: { name: string } }) {
    const userName = context.params.name ? context.params.name : null;
    if (!userName) return NextResponse.json({message: "User not connected", status: 400})
    const exist = await prisma.user.findUnique({
        where: {
            name: userName
        }
    })
    if (!exist) return NextResponse.json({message: "User dont exist", status: 400})
    const data = await prisma.post.findMany({
        orderBy: {
            date: "desc"
        },
        where: {
            saves: {
                has: userName
            }
        }
    })

    if (data) {
        return NextResponse.json({message: "ok", status: 200, data: data})
    }
    return NextResponse.json({message: "User dont exists", status: 400})
}