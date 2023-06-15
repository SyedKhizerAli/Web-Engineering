import React from 'react'
import Slideshow from '../components/HomePage/Slideshow'
import Info from '../components/HomePage/Info'
import TopPlacesList from '../components/HomePage/TopPlacesList'
import {useSelector}  from 'react-redux';
const HomePage = () => {
  const userData=useSelector((state=>state))
  console.log(userData)
  return (
    <div>
      <Slideshow/>
      
      <Info/>
      <TopPlacesList/>
    </div>
  )
}

export default HomePage
