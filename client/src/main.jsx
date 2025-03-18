import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import createBrowserRouter from 'react-router-dom'
import App from './App.jsx'
import Store from './Store/store.js'
import Sign_in from './pages/Sign_in.js'

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
            <Login />
          </Authlayout>
        ),

      },
      {
        path: '/signup',
        element: (
          <Authlayout authentication={false}>
            <Sign_in />
          </Authlayout>
        ),
      },
    ]

  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={Store}>
      <RouterProvider router={route} />
    </Provider>
  </StrictMode>,
)