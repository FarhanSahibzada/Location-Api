import { ApiError } from '../utlis/ErrorApi.js';
import { admin } from '../utlis/firebaseAdmin.js';

const VerifyToken = async (req, res, next) => {
    const token = await  req.cookies?.access_token ||  req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(403, "can not get the token");
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        if (!decodedToken) {
            throw new ApiError(403, "token is not decoded");
        }
 
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        throw new ApiError(403, "error on the verify token middleware");
    }
}

export {
    VerifyToken
}