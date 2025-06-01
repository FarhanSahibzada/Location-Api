import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors({
    origin:"*"
}))

app.use(express.json({limit : '20kb'}))
app.use(express.urlencoded({extended :true , limit : '20kb'}))

// routes 
import location_routes from './routes/location.routes.js'
import userRoutes from './routes/user.route.js'
app.use('/api/v1/location' , location_routes);
app.use('/api/v1/user', userRoutes);


export {
    app
}