import { City_Location } from '../Schema/city_location.js'
import mongoose from 'mongoose'
import { responseApi } from '../utlis/responseApi.js'
import { asyncHandler } from '../utlis/asynchandler.js'

const InsertApi = asyncHandler(async (req, res) => {

  const locations = await city_Location.insertMany([
    {
      city: "Karachi",
      town: "Keamari",
      routes: { latitude: 24.8101, longitude: 66.9750 }
    },
    {
      city: "Karachi",
      town: "SITE Area",
      routes: { latitude: 24.9135, longitude: 66.9942 }
    },
    {
      city: "Karachi",
      town: "Gizri",
      routes: { latitude: 24.8110, longitude: 67.0417 }
    },
    {
      city: "Karachi",
      town: "Burns Road",
      routes: { latitude: 24.8569, longitude: 67.0115 }
    },
    {
      city: "Karachi",
      town: "Soldier Bazaar",
      routes: { latitude: 24.8712, longitude: 67.0278 }
    },
    {
      city: "Karachi",
      town: "Kharadar",
      routes: { latitude: 24.8505, longitude: 66.9972 }
    },
    {
      city: "Karachi",
      town: "Mehran Town",
      routes: { latitude: 24.8295, longitude: 67.1362 }
    },
    {
      city: "Karachi",
      town: "Shershah",
      routes: { latitude: 24.9022, longitude: 66.9747 }
    },
    {
      city: "Karachi",
      town: "Shadman Town",
      routes: { latitude: 24.9760, longitude: 67.0443 }
    },
    {
      city: "Karachi",
      town: "Buffer Zone",
      routes: { latitude: 24.9725, longitude: 67.0486 }
    },
    {
      city: "Karachi",
      town: "Gulshan-e-Maymar",
      routes: { latitude: 25.0337, longitude: 67.0837 }
    },
    {
      city: "Karachi",
      town: "Federal B. Area",
      routes: { latitude: 24.9398, longitude: 67.0856 }
    },
    {
      city: "Karachi",
      town: "Johar Mor",
      routes: { latitude: 24.9070, longitude: 67.1234 }
    },
    {
      city: "Karachi",
      town: "Bahria Town Karachi",
      routes: { latitude: 25.0520, longitude: 67.3020 }
    },
    {
      city: "Karachi",
      town: "Port Qasim",
      routes: { latitude: 24.7741, longitude: 67.3527 }
    },
    {
      city: "Karachi",
      town: "Hawksbay",
      routes: { latitude: 24.8103, longitude: 66.8899 }
    },
    {
      city: "Karachi",
      town: "Bin Qasim Town",
      routes: { latitude: 24.7967, longitude: 67.3482 }
    },
    {
      city: "Karachi",
      town: "Jamshed Town",
      routes: { latitude: 24.8739, longitude: 67.0436 }
    },
    {
      city: "Karachi",
      town: "Rashid Minhas Road",
      routes: { latitude: 24.9182, longitude: 67.1205 }
    },
    {
      city: "Karachi",
      town: "Super Highway",
      routes: { latitude: 25.0425, longitude: 67.1993 }
    }
  ])

  return res
    .status(200)
    .json(new responseApi(200, locations, "successfully data send"))

})


const getAreas = asyncHandler(async (req, res, next) => {

  let { city } = req.query;
  console.log("query name " , city)

  if (!city) {
    const error = new Error("city name is not found")
    error.statusCode = 404;
    throw error;
  }

  const findData = await City_Location.find({ city })
  // console.log("query data find or not " , findData)

  // if (findData.length == 0) {
  //   const error = new Error("data is not found")
  //   error.statusCode = 404;
  //   throw error;
  // }

  return res
    .status(200)
    .json(new responseApi(200, findData, "DATA IS FOUND"))
})


export {
  InsertApi,
  getAreas
}
