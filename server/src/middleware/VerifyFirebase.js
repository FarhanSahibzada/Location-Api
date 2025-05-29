import admin from 'firebase-admin'
import { ApiError } from '../utlis/ErrorApi.js';

const VerifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.spilit(" ")[1];
    console.log("serr token", req.headers.authorization?.spilit(" ")[1])

    if (!token) {
       throw new ApiError(403,"can not get the token");
    }
    try {
        const decodedToken = await admin.auth().verifyIdToken(token)
        console.log(decodedToken)
        req.user = decodedToken;

        next();
    } catch (error) {
        console.log("error when working on the token")
    }
}