import { User } from '../Schema/user.modal.js';
import { asyncHandler } from '../utlis/asynchandler.js';
import { ApiError } from '../utlis/ErrorApi.js(';
import { responseApi } from '../utlis/responseApi.js';

// sending coordintes and getting the exact location with the help of opencage
const reverse_geocoding = async (lat, lng) => {
    try {
        const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.REVERSE_GEOCODING_API}&language=en`
        );
        const data = await res.json();

        if (data?.results?.length > 0) {
            const location = data.results[0].formatted;
            return location;
        }

    } catch (error) {
        throw new ApiError(500, "cannot get the address throw reverse_geocoding");
    }
}

//  checking if the user who login is near the user refgister coordinates
const distance_ = async (current_lat, current_lng, reg_lat, reg_lng) => {
    try {
        const r = 6371000;
        const change_to_rad = (deg) => deg * Math.PI / 180;
        const dlat = change_to_rad(current_lat - reg_lat);
        const dlng = change_to_rad(current_lng, reg_lng);
        const current_lat_rad = change_to_rad(current_lat);
        // const current_lng_rad = change_to_rad(current_lng);
        const register_lat_rad = change_to_rad(reg_lng);
        // const register_lng_rad = change_to_rad(reg_lng);

        console.log("checking dlat=", dlat);
        console.log("checking dlng", dlng);
        console.log("checking lat_rad", current_lat_rad);
        // console.log("checking lng_rad", current_lng_rad);
        console.log("checking reg_lat", register_lat_rad);
        // console.log("checking reg_lng", register_lng_rad);

        const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(current_lat_rad) * Math.cos(register_lat_rad) *
            Math.cos(dlng / 2) * Math.cos(dlng / 2);

        console.log("checking a after half haversine formula= ", a);

        const c = Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        console.log("checking c after most of the  haversine formula= ", c);

        const distance = r * c;
        console.log(distance);

    } catch (error) {
        throw new ApiError(500, "error while checking the coordinates tolerance");

    }
}

const register = asyncHandler(async (req, res) => {

    const { name, email, firebase_uid } = req.body;
    if (
        [name, email, firebase_uid].some((value) => value?.trim() == "")
    ) {
        throw new ApiError(401, "does't get the field values of the register");
    }

    const rawIP =
        req.headers["x-forwarded-for"]?.split(',')[0] ||
        req.connection?.remoteAddress || "8.8.8.8";

    const response = await fetch(`https://ipwho.is/${rawIP}`);
    const data = await response.json();

    if (data && data.success == false) {
        throw new ApiError(500, "error while getting the address of the user");
    }

    const CheckingifUserAlreadExist = await User.findOne({
        $or: [
            { email },
            { firebase_uid }
        ]
    })

    if (CheckingifUserAlreadExist) {
        return res.status(200).json(new responseApi(200, CheckingifUserAlreadExist, "user is already created"));
    };

    const createUser = await User.create({
        name,
        email,
        firebase_uid,
        ip_address: rawIP,
        coords: {
            lat: data?.latitude,
            lng: data?.longitude
        },
        city: data?.city,
        country: data?.country
    });

    if (!createUser) {
        throw new ApiError(500, "something went while registering the user");
    }

    const userData = await User.findById(createUser._id);

    return res.status(200).json(
        new responseApi(200, userData, "user is successfull created")
    )

})

const login = asyncHandler(async () => {

    const { email } = req.body;

    if (!email) {
        throw new ApiError(403, "can not get the email form frontend");
    }

    const finduser = await User.findOne({ email });
    if (!finduser) {
        throw new ApiError(404, "email is not found please try with the correct email");
    }

    const rawIP =
        req.headers["x-forwarded-for"]?.split(',')[0] ||
        req.connection?.remoteAddress || "8.8.8.8";

    const response = await fetch(`https://ipwho.is/${rawIP}`);
    const data = await response.json();

    if (data.success == false) {
        throw new ApiError(500,"something went please try again later");
    }

     const current_lat = data?.latitude ;
     const current_lng =  data?.longitude;
     const reg_lat = finduser?.coords.lat;
     const reg_lng = finduser?.coords.lng;
    
    /**
 * Checks if user is within 50 meters of their registration location.
 * 
 * @param {number} current_lat- The user's current latitude.
 * @param {number} current_lng - The user's current longitude.
 * @param {number} reg_lat - The latitude where the user registered.
 * @param {number} reg_lng  - The longitude where the user registered.
 * @returns {boolean} True if within 50 meters.
 * 
 * @author Farhan Sahibzada
 */


    const actuall_address = await reverse_geocoding();
    console.log("checking the exact location where someone is access user account ==", actuall_address);


    return res.status(200).json(
        new responseApi(200, finduser, "user is successfully finded")
    )

})

export {
    register,
    login
}
