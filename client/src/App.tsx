import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import Navber from './components/layout/Navber';
import Footer from './components/layout/Footer';
import ScrollToHash from './Hooks/ScroolToHash';
import Loading from './components/Loading';

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
   <Loading/>
  )
}

export default App