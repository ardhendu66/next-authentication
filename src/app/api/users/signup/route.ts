import { connectMongo } from "@/dbConfig/dbConfig"
import { User } from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'

connectMongo()

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const requestBody = await req.json()
        const { username, email, password } = requestBody
        console.log(requestBody)
        const user = await User.findOne({email})
        const user0 = await User.findOne({username})
        if(user || user0) {
            return new NextResponse(JSON.stringify({
                status: 400, 
                message: "User already exists"
            }))
        }
        else {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)
            const user1 = new User({ username, email, password: hashedPassword })
            await user1.save()
            return new NextResponse(JSON.stringify({
                status: 201, 
                message: "User created successfully",
                success: true
            }))
        }
    }
    catch(err: any) {
        return new NextResponse(JSON.stringify({
            status: 500, 
            message: err.message
        }))
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const Users = await User.find({})
    console.log(Users)
    new NextResponse(JSON.stringify(Users))
    return res.json()
}