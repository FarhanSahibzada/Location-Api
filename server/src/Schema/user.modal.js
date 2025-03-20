import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    firebaseUid: {
        type: String,
        requied: true
    }
})

export const User = mongoose.models.User || mongoose.model("User", userSchema);