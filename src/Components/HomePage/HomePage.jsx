import React from 'react'
import './HomePage.css'
import { assets } from '../../assets/assets'

const HomePage = () => {
  return (
    <div className='main'>
      <div className='nav'>
        <div className='logo-container'>
          <p className='logo'>SyncSpace</p>
        </div>
        <div className='nav-options'>
          <img src={assets.navbar_img} alt='User Avatar' className='nav-img'/>
          <button className='nav-button logout'>Log Out</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage
