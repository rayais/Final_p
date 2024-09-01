import React from 'react'
import Nav from './Nav'

function Header() {
  return (
    <div className='bg-opacity-90 fixed top-0 left-0 w-full bg-color1 text-color5 shadow-md z-10'>
      <Nav/>
    </div>
  )
}

export default Header