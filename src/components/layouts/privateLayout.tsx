import { Outlet } from 'react-router-dom'
import Header from './header/header'

export default function PrivateLayout() {
  return (
    <>
      <Header />
      <main id='scroll' className='container py-1 mt-5'>
        <Outlet />
      </main>
    </>
  )
}
