import { User } from '../Schema/user.modal.js';
import { sendLoginAlertEmail } from '../services/email_service.js';
import { asyncHandler } from '../utlis/asynchandler.js';
import { ApiError } from '../utlis/ErrorApi.js';
import { responseApi } from '../utlis/responseApi.js';

// sending coordintes and getting the exact location with the help of opencage
const reverse_geocoding = async (lat, lng) => {
    try {
        const res = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${process.env.REVERSE_GEOCODING_API}&language=en`
        );

        const data = await res.json();

        if (data?.results?.length > 0) {
            const location = data.results[0].components;
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
        const dlng = change_to_rad(current_lng - reg_lng);
        const current_lat_rad = change_to_rad(current_lat);
        const register_lat_rad = change_to_rad(reg_lat);

        const a = Math.sin(dlat / 2) * Math.sin(dlat / 2) +
            Math.cos(current_lat_rad) * Math.cos(register_lat_rad) *
            Math.sin(dlng / 2) * Math.sin(dlng / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        const distance = r * c;

        if (parseFloat(distance.toFixed(2)) < 100) {
            return false;
        } else {
            return true;
        }


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
        return res.status(200).json(new responseApi(200, CheckingifUserAlreadExist, "user is already exist"));
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

    const userData = await User.findById(createUser._id).select("-ip_address");

    return res.status(200).json(
        new responseApi(200, userData, "user is successfull created")
    )

})

const login = asyncHandler(async (req, res) => {
    
    const finduser = req?.user;
    
    const rawIP =
        req.headers["x-forwarded-for"]?.split(',')[0] ||
        req.connection?.remoteAddress || "8.8.8.8";

    const response = await fetch(`https://ipwho.is/${rawIP}`);
    const data = await response.json();

    if (data.success == false) {
        throw new ApiError(500, "something went please try again later");
    }

    const current_lat = data?.latitude;
    const current_lng = data?.longitude;
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

    const bool_value = await distance_(
        current_lat,
        current_lng,
        reg_lat,
        reg_lng
    );

    if (!bool_value) {
        return res.status(200).json(
            new responseApi(200, finduser, "user is successfully finded")
        )
    }

    const actuall_address = await reverse_geocoding(current_lat, current_lng);

    await sendLoginAlertEmail(finduser.email, {
        city: actuall_address._normalized_city,
        country: actuall_address.country,
        continent: actuall_address.continent
    })

    return res.status(200).json(
        new responseApi(200, finduser, "user is successfully finded")
    )

});

const current_user =  asyncHandler(async (req ,res)=>{
    res.status(200)
    .json(new responseApi(200 , req.user , "user_data is successfully getted!!" ))
})

export {
    register,
    login,
    current_user
}
