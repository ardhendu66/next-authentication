import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Provide a username'],
        unique: [true, 'Username must be unique']
    },
    email: {
        type: String,
        required: [true, 'Provide a email'],
        unique: [true, 'Email must be unique']
    },
    password: {
        type: String,
        required: [true, 'Provide a password'],
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: {
        type: String,
    },
    forgotPasswordTokenExpiryTime: {
        type: Date,
    },
    verifiedToken: {
        type: String,
    },
    verifiedTokenExpiryTime: {
        type: Date,
    }
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)