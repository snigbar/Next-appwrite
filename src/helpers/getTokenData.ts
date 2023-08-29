import  jwt from 'jsonwebtoken';
import { NextRequest } from "next/server";



export const getTokenData = (req: NextRequest) => {
    try {
        const token = req.cookies.get("token")?.value
        if(token) {
            const decodedToken:any =jwt.verify(token, process.env.TOKEN!)
            return decodedToken.id;
        }
    } catch (error) {
        console.log(error)
    }
}