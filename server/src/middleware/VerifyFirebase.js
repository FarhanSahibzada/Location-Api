import admin from 'firebase-admin'

const VerifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.spilit(" ")[1];
    console.log("serr token", req.headers.authorization?.spilit(" ")[1])

    if (!token) {
        const error = new Error("token is not found")
        error.statusCode = 404;
        throw error;
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