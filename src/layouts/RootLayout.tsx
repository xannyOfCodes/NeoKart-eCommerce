import { Outlet } from 'react-router-dom'
import BottomNav from '../components/layout/BottomNav'


const RootLayout = () => {
  return (
    <div className='pb-16 dark:bg-zinc-950'>
      <Outlet/>
      <BottomNav/>
    </div>
  )
}

export default RootLayout
