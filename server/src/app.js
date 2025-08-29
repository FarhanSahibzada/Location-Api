import express from 'express'
import cors from 'cors'
import { logger } from './logger/winston_logger.js'


const app = express()

app.use(cors({
    origin: ['http://localhost:5173', '*'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
}))

app.use(express.json({ limit: '20kb' }))
app.use(express.urlencoded({ extended: true, limit: '20kb' }))


// routes 
import location_routes from './routes/location.routes.js'
import userRoutes from './routes/user.route.js'
import paymentRoutes from './routes/paytabs_payment.route.js'
import stripe_payment_routes from './routes/stripe_payment.route.js'

app.use('/api/v1/location', location_routes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/payment', paymentRoutes);
app.use('/api/v1/payment', stripe_payment_routes);


//logger
app.use((err, req, res, next) => {
    logger.error({
        message: {
            text: err.message,
            stack: err.stack,
            url: req.originalUrl,
            method: req.method,
            ip: req.ip
        }
    });
    res.status(500).json({ error: "Internal Server Error" });
})


export {
    app
}