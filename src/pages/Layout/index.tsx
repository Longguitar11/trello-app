import { Outlet } from 'react-router-dom'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import { useState } from 'react'

const Layout = () => {
  const [isHidden, setIsHidden] = useState(false)

  return (
    <div className='flex'>
        <SideBar setIsHidden={setIsHidden} isHidden={isHidden}/>
        <Header isHidden={isHidden} />
        <div className={`mt-[100px] min-h-[calc(100vh-100px)] flex ${isHidden ? 'w-full' : 'ml-[300px] w-[calc(100%-300px)]'}`}>
          <Outlet />
        </div>
    </div>
  )
}

export default Layout