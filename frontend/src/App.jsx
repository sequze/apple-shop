import { useState } from 'react'
import './App.css'
import IntroPhoto from './assets/intro__photo.png'
import SiteLogo from './assets/logo.png'
import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";

function App() {

  return (
      <>
        <Header logo={SiteLogo} />
        <Intro photo={IntroPhoto} />
      </>
  )
}

export default App
