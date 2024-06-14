import { Toaster } from 'react-hot-toast'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRouter from './components/protectedRouter'
import Login from './pages/login'
import { AddPatientPage, DiagnosePatientPage, EditPatientPage, PatientPage, ResultPatientPage } from './pages/patient'
import ProfilePage from './pages/profile'
import { PredictionContextProvider } from './pages/patient/PredictionContext';

const router = createBrowserRouter([
  {
    path: 'login',
    element: <Login />
  },
  {
    element: <ProtectedRouter />,
    children: [
      {
        path: '/',
        element: <PatientPage />
      },
      {
        path: '/add-patient',
        element: <AddPatientPage />
      },
      {
        path: '/edit-patient/:id',
        element: <EditPatientPage />
      },
      {
        path: '/result-patient/:id',
        element: <ResultPatientPage />
      },
      {
        path: '/diagnose-patient/:id',
        element: <DiagnosePatientPage />
      },
      {
        path: '/profile',
        element: <ProfilePage />
      }
    ]
  }
])

function App() {
  return (
    <>
      <PredictionContextProvider>
      <RouterProvider router={router} />
      <Toaster
        position='top-center'
        reverseOrder={true}
        toastOptions={{
          style: {
            maxWidth: '80%'
          }
        }}
      />
      </PredictionContextProvider>
    </>
  )
}

export default App
