import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import App from './App.jsx'
import Store from './Store/store.js'
import {Sign_in , Home, Login_in , PricingPage} from './pages/index.js'
import Authlayout from './components/Authlayout/Authlayout.js'
import { Provider } from 'react-redux'
import './index.css'
import {QueryClientProvider , QueryClient} from '@tanstack/react-query'

const route = createBrowserRouter([
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
      },{
        path: '/pricing-page',
        element : (
          <Authlayout authentication={false}>
          <PricingPage />
          </Authlayout>
)
      }
    ]

  }
])

const queryclient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <QueryClientProvider client={queryclient}>
      <RouterProvider router={route} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)