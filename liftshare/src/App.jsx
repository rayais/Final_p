import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Addride from './components/body/Addride'
import Register from './components/Register'
import Rides from './components/body/Rides'
import Profile from './components/body/Profile'


function App() {
  
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>},{
        path:'/add',
        element:<Addride/>
      },{
        path:'/register',
        element:<Register/>
      },{
        path:'/list',
        element:<Rides/>
      },{
        path:'/profile',
        element:<Profile/>
      }
      
  ])

  return (
    <>
      <div className='bg-slate-100'>
      <RouterProvider router={router}/>
      </div>
    </>
  )
}

export default App
