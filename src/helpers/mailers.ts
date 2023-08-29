import User from '@/models/UserModel';
import  bcryptjs from 'bcryptjs';
import nodemailer from "nodemailer"


export const sendEmail  =  async({email, emailType, userId}:any) => {

    try {

        console.log(userId)
        const hashedToken = await bcryptjs.hash(userId.toString(), 10)

        if(emailType === "VERIFY") await User.findByIdAndUpdate(userId, {verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000})
        else if(emailType === "RESET") await User.findByIdAndUpdate(userId, {forgotPassWordToken: hashedToken, forgetPasswordTokenExpiry: Date.now() + 3600000})

        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "2304cd8059e0e8",
              pass: "0f9fe293266625"
            }
          });

          const mailOptions = {
            from:"snigbar@outlook.com",
            to: email,
            subject: emailType === "VERIFY"? "verify your email address": "Reset your password",
            html: emailType === "VERIFY"?`<p style="text-align: center">Click <a href="${process.env.Domain}/verifyemail?token=${hashedToken}">here</a>
                  "verify your email"</p>`:`<p style="text-align: center">Click <a href="${process.env.Domain}/resetpassword?token=${hashedToken}">here</a>
                  "Reset your password"</p>`
          }

          const mailResponse = await transport.sendMail(mailOptions)
          return mailResponse;

    } catch (error:any) {
        throw new Error(error.message)
    }
}