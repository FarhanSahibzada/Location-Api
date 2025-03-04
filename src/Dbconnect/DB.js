import mongoose from "mongoose";


const connectDatabase =  async()=>{
    try {
        const connectdatabase = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`)    
        console.log('mongodb is connected!' , connectdatabase.connection.host)
    } catch (error) {
        console.log('error when connecting the database', error)
        process.exit(1);
    }
}

export {
    connectDatabase
}