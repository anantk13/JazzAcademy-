import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/user.model'
import { NextRequest , NextResponse } from "next/server";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextApiRequest } from "next";

connect()

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json()
        const {email,password} = reqBody
        console.log(reqBody)
        const user = await User.findOne({email}) 

        if(!user){
            return NextResponse.json({error:"Invalid credentials"},{status:400})
        }
        console.log("user exists")

        const validPassword = await bcryptjs.compare(password,user.password)
        
        if(!validPassword){
            return NextResponse.json({error: "Check your password"},{status:400})
        }
        
        const tokenData = {   // only id is required
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData,process.env.TOKEN_SECRET!,{expiresIn: '1d'})

        const response = NextResponse.json({
            message: "Logged In Success",
            success: true
        })

        response.cookies.set("token",token,{httpOnly: true, path: '/' })   // in next there is no requirement for downloading packages for cookies as response type is NextResponse
        return response
    } catch (error:any) {
        return NextResponse.json({error: error.message},{status:500})
    }
}

