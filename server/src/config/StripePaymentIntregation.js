import dotenv from 'dotenv'
dotenv.config()
import stripe from 'stripe'


export const Stripe = new stripe(process.env.STRIPE_SERVER_KEY,{
    apiVersion : '2024-04-10',
})