import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
connect();
export async function POST(req:NextRequest) {

    try {
    const {newPassword, token} = await req.json()
    

    const user = await User.findOne({ forgotPassWordToken: token, forgetPasswordTokenExpiry: {$gt: Date.now()}});
    if (!user) {
        return NextResponse.json({error: "Invalid token"}, {status: 400})
    }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(newPassword, salt)
  
        user.password =  hashedPassword;
        user.forgotPassWordToken = undefined;
        user.forgotPassWordTokenExpiry = undefined;
        await user.save();


    return NextResponse.json({message: "Password Change Successful", success: true})

    } catch (error:any) {
        return NextResponse.json({error: error.message})
    }

    
}