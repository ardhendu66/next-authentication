import { connectMongo } from "@/dbConfig/dbConfig"
import { User } from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

connectMongo()

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const requestBody = await req.json()
        const { email, password } = requestBody
        const user = await User.findOne({email})
        if(user) {
            const validPassword = await bcrypt.compare(password, user.password)
            if(validPassword) { 
                const token = await jwt.sign({
                    id: user._id,
                    username: user.username,
                    email: user.email
                }, 
                    process.env.JWT_SECRET_KEY!, 
                    {expiresIn: '1h'}
                )
                const response = new NextResponse(JSON.stringify({
                    message: "Login Success",
                    sucess: true
                }))
                response.cookies.set("token", token, {
                    httpOnly: true,
                })
                return response
            }
            else {
                return new NextResponse(JSON.stringify({
                    status: 400,
                    message: "Invalid Password"
                }))
            }
        }
        else {
            return new NextResponse(JSON.stringify({
                status: 400,
                message: "Provide valid email and password"
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