import { Outlet, useLocation } from 'react-router-dom';
import Navber from './components/layout/Navber';
import Footer from './components/layout/Footer';
import ScrollToHash from './Hooks/ScroolToHash';
import Loading from './components/Loading';
import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import Threejsmodel from './components/ThreejsModel';
import { useSelector } from 'react-redux';
import { RootState } from './Store/store';

function App() {
  const { progress } = useProgress();
  const [loading, set_loading] = useState<boolean>(true);
  const { pathname } = useLocation();
  const checkLoading = useSelector((state: RootState) => state.auth.loading)


  const shouldShowLayout =
    !loading &&
    !checkLoading &&
    pathname.toLowerCase() !== "/login" &&
    pathname.toLowerCase() !== "/sign-up";


  useEffect(() => {
    if (Math.floor(progress) >= 95) {
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
      {shouldShowLayout && <Navber />}
      <ScrollToHash />
      <Outlet />
      {shouldShowLayout && <Footer />}
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