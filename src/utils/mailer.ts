import nodemailer from 'nodemailer'
import bcryptjs from 'bcryptjs'
import User from '@/models/user.model'

export const sendEmail =async({email,emailType,userId}:any) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
         
        if(emailType === "VERIFY"){
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                    verifyToken: hashedToken , verifyTokenExpiry: Date.now()+3600000
                    }
                }
            )
        } else if(emailType === "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    $set: {
                    forgotPasswordToken: hashedToken , forgotPasswordTokenExpiry: Date.now()+3600000
                    }
                }
            )
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "e8e8992a083d5b",
              pass: "84d2ad23905709"   
     },
   });
 
  const mailOptions = {
    from: 'anant.kapooor@gmail.com', // sender address
    to: email, // list of receivers
    subject: emailType === 'VERIFY'?"Verify your email" : "Reset your password", // Subject line
    html:  `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
    or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
    </p>` 
  };
    
  const mailResponse = await transport.sendMail(mailOptions)
  return mailResponse
  }
// async..await is not allowed in global scope, must use a wrapper
    catch (error:any) {
        throw new Error("err"+ error.message)
    }
}