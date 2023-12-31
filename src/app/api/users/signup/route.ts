import { connect } from "@/dbConfig/dbConfig";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import User from "@/models/UserModel"
import { sendEmail } from "@/helpers/mailers";

connect()

export async function POST(req: NextRequest){
    try {

        const {userName, email, password } = await req.json()
        // find if user exists 
        const user = await User.findOne({email})

        if(user) return NextResponse.json({error: "User Already Exists"}, {status: 400}) 
        
        // gen salt 
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        // save user
       const newUser = new User({ userName, email, password: hashedPassword}) 
       await newUser.save()

    //   send email

    await sendEmail({email, emailType: "VERIFY", userId: newUser._id})


       return NextResponse.json({
        message: "User Creaated successfully",
        success: true,
        newUser
       })


    } catch (error:any) {
        console.log(error)
        return NextResponse.json({error: error.message})
    }
}