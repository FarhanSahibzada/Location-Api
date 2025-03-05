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

export const City_Location = mongoose.models.City_location || mongoose.model('city_locations', CityBasedSchma);