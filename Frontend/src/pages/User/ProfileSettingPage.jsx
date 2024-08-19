import React from 'react'
import Header from '../../components/UserComponent/Header'
import HeroBlock from '../../components/UserComponent/HeroBlock'
import Img from "../../assets/images/Section.png";
import ProfileSetting from '../../components/UserComponent/ProfileSetting';
import Footer from '../../components/UserComponent/Footer';

const ProfileSettingPage = () => {
  return (
    <>
        <Header />
        <HeroBlock title={"Profile Settings"} img={Img} />
        <ProfileSetting />
        <Footer />
    </>
  )
}

export default ProfileSettingPage