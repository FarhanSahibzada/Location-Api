import { City } from '../Schema/city_location.js'
import { responseApi } from '../utlis/responseApi.js'
import { asyncHandler } from '../utlis/asynchandler.js'

const InsertApi = asyncHandler(async (req, res) => {

  const locations = await City.insertMany(
    [
      {
          "city": "Karachi",
          "town": "Malir",
          "routes": { "latitude": 24.8895, "longitude": 67.1932 }
      },
      {
          "city": "Karachi",
          "town": "Korangi",
          "routes": { "latitude": 24.8277, "longitude": 67.1326 }
      },
      {
          "city": "Karachi",
          "town": "Landhi",
          "routes": { "latitude": 24.8563, "longitude": 67.2026 }
      },
      {
          "city": "Karachi",
          "town": "Lyari",
          "routes": { "latitude": 24.8527, "longitude": 66.9904 }
      },
      {
          "city": "Karachi",
          "town": "DHA Phase 8",
          "routes": { "latitude": 24.8131, "longitude": 67.0682 }
      },
      {
          "city": "Karachi",
          "town": "Clifton Block 2",
          "routes": { "latitude": 24.8138, "longitude": 67.0344 }
      },
      {
          "city": "Karachi",
          "town": "Nazimabad",
          "routes": { "latitude": 24.9185, "longitude": 67.0321 }
      },
      {
          "city": "Karachi",
          "town": "North Nazimabad",
          "routes": { "latitude": 24.9387, "longitude": 67.0424 }
      },
      {
          "city": "Karachi",
          "town": "Gulistan-e-Johar",
          "routes": { "latitude": 24.9133, "longitude": 67.1333 }
      },
      {
          "city": "Karachi",
          "town": "Model Colony",
          "routes": { "latitude": 24.8973, "longitude": 67.1838 }
      },
      {
          "city": "Karachi",
          "town": "Shahrah-e-Faisal",
          "routes": { "latitude": 24.8823, "longitude": 67.1125 }
      },
      {
          "city": "Karachi",
          "town": "Gulshan-e-Iqbal",
          "routes": { "latitude": 24.9271, "longitude": 67.0965 }
      },
      {
          "city": "Karachi",
          "town": "Orangi Town",
          "routes": { "latitude": 24.9428, "longitude": 66.9728 }
      },
      {
          "city": "Karachi",
          "town": "Saadi Town",
          "routes": { "latitude": 24.9668, "longitude": 67.1793 }
      },
      {
          "city": "Karachi",
          "town": "Baldia Town",
          "routes": { "latitude": 24.9186, "longitude": 66.9565 }
      },
      {
          "city": "Karachi",
          "town": "Manzoor Colony",
          "routes": { "latitude": 24.8827, "longitude": 67.0593 }
      },
      {
          "city": "Karachi",
          "town": "Gadap Town",
          "routes": { "latitude": 25.0731, "longitude": 67.2067 }
      },
      {
          "city": "Karachi",
          "town": "Sheraton Hotel",
          "routes": { "latitude": 24.8474, "longitude": 67.0196 }
      },
      {
          "city": "Karachi",
          "town": "Airport Area",
          "routes": { "latitude": 24.9029, "longitude": 67.1683 }
      },
      {
          "city": "Karachi",
          "town": "Saddar",
          "routes": { "latitude": 24.8547, "longitude": 67.0199 }
      }    
 ])

  return res
    .status(200)
    .json(new responseApi(200, locations, "successfully data send"))

})

const getAreas = async (req, res) => {
  try {
    let { city } = req.query;

    if (!city) {
      const error = new Error("city name is not found")
      error.statusCode = 404;
      throw error;
    }

    const findData = await City.find({city})
  
    if (findData.length == 0) {
      const error = new Error("data is not found")
      error.statusCode = 404;
      throw error;
    }

    return res
      .status(200)
      .json(new responseApi(200 , findData, "data is successfully fetch"))

  } catch (error) {
    console.log(error.message)
    return res.status(500).json({
      success: false,
      message: error.message
    })
  }
}


export {
  InsertApi,
  getAreas
}
