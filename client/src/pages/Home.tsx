import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className=' bg-black/[0.88] p-2  '>
            <div className='flex justify-end  space-x-2 me-2 mt-2'>
            <Link to={'/pricing-page'}>
            <button className='text-white font-bold bg-blue-500 rounded-lg px-2 py-1.5'>Pricing</button>
            </Link>
            <Link to={'/login'} >
            <button className='text-white font-bold bg-blue-500 rounded-lg px-2 py-1.5'>Login</button>
            </Link>
            </div>
        <div className='flex justify-center items-center min-h-screen '>
            <h1 className='font-bold text-white text-xl'>Welcome To the Location Api Karachi</h1>
        </div>
        </div>
    )
}
