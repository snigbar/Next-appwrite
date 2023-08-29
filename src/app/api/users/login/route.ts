import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/models/UserModel"
import jwt from "jsonwebtoken"

connect()

export async function POST(req: NextRequest) {
  try{  
    const {email, password} = await req.json() 
    const user = await User.findOne({email})
    // checking if the user doesn't exists 

    if(!user) return NextResponse.json({error: "no user found with this email"},{status: 400})
    const isValidPassword = bcryptjs.compare(password, user.password)
    if(!isValidPassword) return NextResponse.json({error: "not valid password"}, {status: 400})

    // create token
    const tokenData= {
        id: user._id,
        userName: user.userName,
        email: user.email
    }

   

    const token = await jwt.sign(tokenData, process.env.TOKEN!, {expiresIn: "1d"})
    const response = NextResponse.json({
        message: "Login successful",
        success: true,
    })
    
    response.cookies.set("token", token, {
        httpOnly: true, 
        
    })
    return response;

}catch(error:any){

    return NextResponse.json({error: error.message},{status: 500})
}


}