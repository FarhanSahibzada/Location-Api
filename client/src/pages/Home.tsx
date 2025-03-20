import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div className=' bg-black/[0.88] p-2'>
            <Link to={'/sign-in'} className='flex justify-end'>
            <button className='text-white font-bold bg-blue-500 rounded-lg px-2 py-1.5'>Sign In</button>
            </Link>
        <div className='flex justify-center items-center min-h-screen '>
            <h1 className='font-bold text-white text-xl'>Welcome To the Location Api Karachi</h1>
        </div>
        </div>
    )
}
