import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true,"Please provide a username"],
        unique: [true,"Username should be unique"]
    },
    email: {
        type: String,
        required: [true,"Please provide a username"],
        unique: [true,"Username should be unique"]
    },
    password: {
        type: String,
        required: [true,"Please provide a username"],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },  
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)  // we take users in nextjs for exporting unlike in react

export default User