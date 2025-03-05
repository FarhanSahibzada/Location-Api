import express from 'express'
import cors from 'cors'

const app = express()

app.use(cors())
app.use(express.json({limit : '20kb'}))
app.use(express.urlencoded({extended :true , limit : '20kb'}))

// routes 
import location_routes from './routes/location.routes.js'
app.use('/api/location' , location_routes)


export {
    app
}