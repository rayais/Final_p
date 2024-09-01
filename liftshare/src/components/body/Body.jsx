import React from 'react'
import Upper from './Upper'
import List from './List'
import { Link } from 'react-router-dom'


function Body() {
  return (
    <div>
        <div className='bg-slate-200 py-6 mb-8'>

        <Upper/>
        </div>
            <h1 className='flex justify-center items-center font-extrabold text-3xl'>Rides availabale</h1>
            <br />
            <div className='flex justify-end mr-[20%]'>
            <Link to="/add">
            <button className='w-32 bg-blue-500 text-white font-bold py-2 px-4 rounded '>ADD LIFT</button>
            </Link>
            </div><br />
        <div className='flex justify-center items-center'>
        <List/>
        </div>
    </div>
  )
}

export default Body