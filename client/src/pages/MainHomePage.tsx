import React from 'react'
import Home from './Home'
import About from './About'
import CardPage from './CardPage'
import ContactUsPage from './ContactUsPage'

export default function MainHomePage() {

// applying the current user api and hiiting from here   

  return (
    <>
    <Home/>
    <About/>
    <CardPage/>
    <ContactUsPage />
    </>
  )
}
