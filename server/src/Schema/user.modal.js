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
    firebase_uid: {
        type: String,
        requied: true
    },
    ip_address: {
        type: String,
        required: true,
        unique: true
    },
    coords: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    city: {
        type: String,
        required: true
    },
    country: {
        type: String,
        requied: true,
    }
}, { timestamps: true })

export const User = mongoose.models.User || mongoose.model("User", userSchema);