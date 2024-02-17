import { connectMongo } from "@/dbConfig/dbConfig"
import { NextRequest, NextResponse } from "next/server"

connectMongo()

export function POST(req: NextRequest ) {
    try {
        const response = new NextResponse(JSON.stringify({
            message: "LogOut successful",
            success: true
        }))
        response.cookies.delete("token")
        return response
    }
    catch(err: any) {
        return new NextResponse(JSON.stringify({
            status: 500,
            message: err.message
        }))
    }
}