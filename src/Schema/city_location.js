import mongoose from "mongoose";


const CityBasedSchma = new mongoose.Schema({
    city: {
        type: String,
    },
    town: {
        type: String
    },
    routes: {
        latitude: Number,
        longitude: Number
    }
})

export const City = mongoose.models.City_location || mongoose.model('city', CityBasedSchma);