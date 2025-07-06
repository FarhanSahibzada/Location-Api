import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import Store from './Store/store.js'
import { Provider } from 'react-redux'
import './index.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import router from './lib/route.js'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Threejsmodel from './components/ThreejsModel.js'
import SolarSystemProject from './components/SolarSystemProject.js'


const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHIBLE_KEY);
const queryclient = new QueryClient();

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Provider store={Store}>
      <QueryClientProvider client={queryclient}>
        <Elements stripe={stripePromise}>
           <RouterProvider router={router} />
          {/* <SolarSystemProject /> */}
          {/* <Threejsmodel/> */}
        </Elements>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)