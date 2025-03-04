import { city_Location} from '../Schema/city_location.js'
import mongoose from 'mongoose'
import {responseApi} from '../utlis/responseApi.js'

const InsertApi = async  (req,res, next)=>{

  const locations =  await city_Location.insertMany([
        {
            city: "Karachi",
            town: "Gulshan-e-Iqbal",
            routes: { latitude: 24.9263, longitude: 67.1123 }
          },
          {
            city: "Karachi",
            town: "Saddar",
            routes: { latitude: 24.8547, longitude: 67.0271 }
          },
          {
            city: "Karachi",
            town: "Clifton",
            routes: { latitude: 24.8086, longitude: 67.0320 }
          },
          {
            city: "Karachi",
            town: "North Nazimabad",
            routes: { latitude: 24.9386, longitude: 67.0369 }
          },
          {
            city: "Karachi",
            town: "Korangi",
            routes: { latitude: 24.8293, longitude: 67.1377 }
          },
          {
            city: "Karachi",
            town: "Malir",
            routes: { latitude: 24.8978, longitude: 67.2160 }
          },
          {
            city: "Karachi",
            town: "Defence (DHA)",
            routes: { latitude: 24.8121, longitude: 67.0579 }
          },
          {
            city: "Karachi",
            town: "Lyari",
            routes: { latitude: 24.8554, longitude: 66.9904 }
          },
          {
            city: "Karachi",
            town: "Shah Faisal Colony",
            routes: { latitude: 24.8840, longitude: 67.1574 }
          },
          {
            city: "Karachi",
            town: "Gulistan-e-Jauhar",
            routes: { latitude: 24.9049, longitude: 67.1222 }
       }
    ])
    
    res
    .status(200)
    .json(new responseApi(200 , locations , "successfully data send"))
    

}
