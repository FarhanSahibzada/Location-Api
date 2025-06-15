import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Authlayout from '../components/Authlayout/Authlayout';
import {
  Home,
  Login_in,
  Sign_in,
  PricingPage
} from '../pages/index';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
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
        path: '/sign-in',
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
    ],
  },
]);

export default router;
