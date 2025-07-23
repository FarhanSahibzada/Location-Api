import { Outlet, useLocation } from 'react-router-dom';
import Navber from './components/layout/Navber';
import Footer from './components/layout/Footer';
import ScrollToHash from './Hooks/ScroolToHash';
import Loading from './components/Loading';
import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import Threejsmodel from './components/ThreejsModel';

function App() {
  const { progress } = useProgress();
  const [loading, set_loading] = useState<boolean>(true);
  const [model, hide_model] = useState<boolean>(false);
  const {pathname } = useLocation();
  const [hide ,  set_hide] = useState<boolean>(false);

  useEffect(()=>{
    if(pathname == '/sign-up' || pathname.toLowerCase() == '/login'){
      set_hide(false);
    }else {
      set_hide(true)
    }
  },[pathname])

  useEffect(() => {
    if (Math.floor(progress) >= 100) {
      const timer = setTimeout(() => {
        set_loading(false);
      }, 100);
      
      return () => clearInterval(timer)
    } else {
      set_loading(true)
    }
  }, [progress])


  return !loading ? (
    <div className='w-full h-full overflow-hidden'>
      {hide  && ( <Navber/>)} 
      <ScrollToHash />
      <Outlet />
      {hide && ( <Footer/>)}
    </div>
  ) : (
    <>
      <div className={`${progress > 95 ? "hidden" : "block"} absolute`}>
        <Threejsmodel />
      </div>
      <Loading progress={progress} />
    </>
  )
}

export default App