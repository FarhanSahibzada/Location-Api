import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config({
    path : '.env'
})


const connectDatabase = async () => {
    console.log("database name :", process?.env?.MONGODB_URL)
    try {
        const connectdatabase = await mongoose.connect(`${process.env.MONGODB_URL}/LocationData`)
        console.log('mongodb is connected!', connectdatabase.connection.host)
    } catch (error) {
        console.log('error when connecting the database', error)
        process.exit(1);
    }
}

export {
    connectDatabase
}