import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailers";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";
import { visitCommaListElements } from "typescript";

connect()

export  async function POST(req:NextRequest) {
  try{  
    const {email}:any = await req.json()

    const user = await User.findOne({email})
    const mailResponse = sendEmail({email:user.email, emailType: "RESET", userId:user._id})
    console.log(mailResponse)
    return  NextResponse.json({user})
}catch(error:any){
    return NextResponse.json({error: error.message})
}
}