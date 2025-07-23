import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Authlayout from '../components/Authlayout/Authlayout';
import {
  Login_in,
  Sign_in,
  PricingPage
} from '../pages/index';
import MainHomePage from '../pages/MainHomePage';
import Profile from '../pages/Profile';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MainHomePage />,
      },
      {
        path: '/login',
        element: (
          <Authlayout authentication={false}>
            <Login_in />
          </Authlayout>
        ),
      },
      {
        path: '/sign-up',
        element: (
          <Authlayout authentication={false}>
            <Sign_in />
          </Authlayout>
        ),
      },
      {
        path: '/pricing-page',
        element: (
          <Authlayout authentication={false}>
            <PricingPage />
          </Authlayout>
        ),
      },
      {
        path: "/profile",
        element : (
          <Authlayout authentication={true}>
            <Profile />
          </Authlayout>
        )
      }
    ],
  },
]);

export default router;
