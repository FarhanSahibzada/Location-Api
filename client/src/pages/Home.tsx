import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import StripePaymentComponent from '../components/StripePaymentComponent'
import authServices from '../firebase/authFun'



export default function Home() {

    return (
        <div className='bg-black/[0.88] p-2  '>
            <div className='flex justify-end  space-x-2 me-2 mt-2'>
                <Link to={'/pricing-page'}>
                    <button className='text-white font-bold bg-blue-500 rounded-lg px-2 py-1.5'>Pricing</button>
                </Link>
                <Link to={'/login'} >
                    <button className='text-white font-bold bg-blue-500 rounded-lg px-2 py-1.5'>Login</button>
                </Link>
            </div>
            <div className='flex flex-col items-center justify-center min-h-screen space-y-6'>
                <h1 className='font-bold text-white text-xl'>Welcome To the Location Api Karachi</h1>
            </div>
        </div>
    )
}
