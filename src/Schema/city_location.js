import mongoose from "mongoose";


const CityBasedSchma = new mongoose.Schema({
    city: {
        type: String,
    },
    townname: {
        type: String
    },
    routes: {
        latitude: Number,
        longitude: Number
    }
})

export const city_Location = mongoose.models.city_location || mongoose.model('city_location', CityBasedSchma);