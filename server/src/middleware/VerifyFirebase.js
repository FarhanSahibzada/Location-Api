import { User } from '../Schema/user.modal.js';
import { ApiError } from '../utlis/ErrorApi.js';
import { admin } from '../utlis/firebaseAdmin.js';
import { responseApi } from '../utlis/responseApi.js';

const VerifyToken = async (req, res, next) => {
    const token = await req.cookies?.access_token || req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        return res.status(401).json(new responseApi(401, {}, "token is not provided"))
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)

        if (!decodedToken) {
            return next(new ApiError("token is not decoded", 403));
        }
       
        const user = await User.findOne({ firebase_uid: decodedToken?.uid }).select("-ip_address");

        if (!user) {
            return res.status(404).json(new responseApi(404 , {}, "user is not in the databse please try register"));
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        return next(new ApiError("error on the verify token middleware", 403));
    }
}

export {
    VerifyToken
}