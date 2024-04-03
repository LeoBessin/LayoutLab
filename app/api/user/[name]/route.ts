import {NextRequest, NextResponse} from "next/server"
import {prisma} from "@/src/db/prisma";

export const dynamic = 'force-dynamic' // defaults to force-static

export async function GET(req: NextRequest, context: { params: { name: string } }) {
    if (!context.params.name) return NextResponse.json({message: "Name not provided", status: 400})
    const exist = await prisma.user.findUnique({
        where: {
            name: context.params.name
        }
    })

    if (exist) {
        return NextResponse.json({message: "ok", status: 200, data: exist})
    }
    return NextResponse.json({message: "User dont exists", status: 400})
}