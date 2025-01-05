import React from 'react'
import HeroSection from '../components/core/Home/HeroSection'
import AboutTheBrand from '../components/core/Home/AboutTheBrand'
import CategoriesSection from '../components/core/Home/CategoryTheme'
import Footer from '../components/core/Home/Footer'

const Home = () => {
  return (
    <div>
      
      <HeroSection/>
      <AboutTheBrand/>
      <CategoriesSection/>
      <Footer/>
    </div>
  )
}

export default Home