import mongoose from "mongoose";

export const connect = async() => {
    try{
        mongoose.connect(process.env.MONGO_URI!)

            const connection = mongoose.connection
            connection.on("connected", ()=> {
                console.log("mongo connected successfully")
            })

            connection.on("error", (error)=> {
                console.log("mongo not working" + error)
                process.exit()
            })
        
    }catch(err){
        console.log("something is went wrong" + err)
    }
}