import { connect } from "@/dbConfig/dbConfig";
import { getTokenData } from "@/helpers/getTokenData";
import User from "@/models/UserModel";
import { NextRequest, NextResponse } from "next/server";


connect();

export async function GET(req:NextRequest) {
    try {
        const userId = await getTokenData(req)
        const user = await User.findById(userId).select("-password")
        return NextResponse.json({
            message: "user found",
            success: true,
            data: user
        })

    } catch (error:any) {
        return NextResponse.json({
                error: error.message
        }, {status: 400})  
    }
}