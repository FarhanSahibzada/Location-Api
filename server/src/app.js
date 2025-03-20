import express from 'express'
import cors from 'cors'
import admin from 'firebase-admin'
import serviceAccount from '../firebase-admin-sdk.json' assert { type: "json" };


const app = express()
admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)

})

app.use(cors({
    origin:"*"
}))
app.use(express.json({limit : '20kb'}))
app.use(express.urlencoded({extended :true , limit : '20kb'}))

// routes 
import location_routes from './routes/location.routes.js'
import userRoutes from './routes/user.route.js'
app.use('/api/v1/location' , location_routes)
app.use('/api/v1/user', userRoutes)


export {
    app
}