import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom';
import AuthServices from './firebase/authFun';
import { login } from './Store/AuthSlice';

function App() {

  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const sendRequest = useCallback(async () => {
    try {
      const response = await AuthServices.getCurrentUser()
      if (response) {
        console.log("mila ha")
      }
    } catch (error) {
      console.log("user not found", error)
      navigate('/sign-in')
    }
  }, [navigate])

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      try {
        await sendRequest()
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [sendRequest])


  return !loading ? (
    <div className='w-full'>
      <Outlet />
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-slate-400 to-base-300">
      <div className="flex space-x-3 mb-6">
        <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-100"></div>
        <div className="w-4 h-4 bg-white rounded-full animate-bounce delay-200"></div>
      </div>
      {/* <h1 className="text-white text-2xl font-semibold animate-pulse">Please Wait...</h1> */}
    </div>
  )
}

export default App