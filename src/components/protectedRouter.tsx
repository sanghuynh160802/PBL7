import { Navigate } from 'react-router-dom'
import PrivateLayout from './layouts/privateLayout'

export default function ProtectedRouter() {
  const token = localStorage.getItem('token')

  return token ? (
    <div className='min-h-screen overflow-hidden bg-slate-300'>
      <PrivateLayout />
    </div>
  ) : (
    <Navigate to='/login' replace />
  )
}
