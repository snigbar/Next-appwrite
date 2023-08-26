import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, "please provide a userName"],
    },
    email: {
        type: String,
        required: [true, "please provide a userName"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "please provide a password"],
        min: 6
    },
    userName: {
        type: String,
        required: [true, "please provide a userName"],
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPassWordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

})


const User = mongoose.models.User || mongoose.model('User', userSchema);
 
export default User