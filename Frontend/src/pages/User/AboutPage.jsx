import React from 'react'
import Header from '../../components/UserComponent/Header'
import Search from '../../components/UserComponent/Search'
import HeroBlock from '../../components/UserComponent/HeroBlock'
import sectionImg from "../../assets/images/Section.png"

const AboutPage = () => {
  return (
    <>
        <Header />
        <HeroBlock title="About" img={sectionImg}/>
        <div className="aboutPage">

        </div>
    </>
  )
}

export default AboutPage