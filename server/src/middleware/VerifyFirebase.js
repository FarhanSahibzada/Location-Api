import { ApiError } from '../utlis/ErrorApi.js';
import { responseApi } from '../utlis/responseApi.js';
import { admin } from '../utlis/firebaseAdmin.js';

const VerifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.spilit(" ")[1];
    console.log("getting token", token);

    if (!token) {
       throw new ApiError(403,"can not get the token");
    }

    try {
        const decodedToken = await admin.auth.VerifyToken(token)
        if(!decodedToken){
            throw new ApiError(403, "token is not decoded");            
        }

        req.user = decodedToken;
        next();
    } catch (error) {
       throw new ApiError(403 , "error on the verify token middleware");
    }
}

export {
    VerifyToken
}