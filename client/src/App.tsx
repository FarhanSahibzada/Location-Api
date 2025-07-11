import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navber from './components/layout/Navber';
import Footer from './components/layout/Footer';
import ScrollToHash from './Hooks/ScroolToHash';

function App() {

   const [loading, setLoading] = useState(false)
  // const dispatch = useDispatch();
  // const navigate = useNavigate()



  return !loading ? (
    <div className='w-full h-full overflow-hidden
    '>
      <Navber/>
      <ScrollToHash/>
      <Outlet />
      <Footer/>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center min-h-screen 
    bg-gradient-to-r from-slate-400 to-base-300">
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