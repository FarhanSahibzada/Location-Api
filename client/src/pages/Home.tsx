import { useProgress } from '@react-three/drei'
import Threejsmodel from '../components/ThreejsModel'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'


export default function Home() {

 
        return (
            <section id='#' className='bg-black/[0.88] p-2  '>
                <div className='space-x-2 me-2 mt-2 hidden  xl:flex xl:justify-end'>
                <Link to={'/sign-up'}>
                    <button className='font-montserrat font-semibold bg-transparent  border-2 border-slate-200 text-slate-200
                     px-4 py-2 rounded-full hover:bg-slate-100 hover:border-transparent hover:text-black duration-200 
                    '>Create Free Account</button>
                </Link>
                <Link to={'/login'} >
                    <button className='font-montserrat px-4 py-2  font-semibold  rounded-full bg-slate-100 border-transparent text-black duration-200
                     hover:bg-transparent  border-2 hover:border-slate-200 hover:text-slate-200 
                    
                    '>Login</button>
                </Link>
            </div>

                <div className='flex flex-col md:mt-0 md:flex-row items-center justify-center sm:justify-start 
            min-h-screen space-y-2 px-2 md:px-8 lg:gap-x-10 md:pr-4 mt-20'>

                    <div className='#content w-full '>
                        <h1 className='text-white -mt-2 sm:mt-4 text-4xl md:text-7xl font-bold 
                bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500
                sm:max-w-2xl'
                        >
                            The Fastest Way to Get City Coordinates</h1>
                        <p
                            className='text-neutral-300  text-base md:text-lg font-normal  mt-4
                  sm:max-w-2xl
                    '
                        >
                            Access accurate and structured location data for every neighborhood,
                            zone, and landmark — via a simple API.</p>
                    </div>

                    <div className="w-full h-[400px] sm:h-[400px] md:h-[400px] 
               lg:h-[600px] flex items-center justify-center md:justify-start lg:justify-start">
                        <Threejsmodel />
                    </div>

                </div>


            </section>
        )
    }

