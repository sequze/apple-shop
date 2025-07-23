import { useState } from 'react'
import './App.css'
import IntroPhoto from './assets/intro__photo.png'
import SiteLogo from './assets/logo.png'
import card1 from "./assets/categories/card-1.jpeg"
import card2 from "./assets/categories/card-2.jpeg"
import card3 from "./assets/categories/card-3.jpeg"
import card4 from "./assets/categories/card-4.jpeg"
import card5 from "./assets/categories/card-5.jpeg"
import Header from "./components/Header.jsx";
import Intro from "./components/Intro.jsx";
import Cards from "./components/Cards.jsx";

function App() {

    const cards = [card1, card2, card3, card4, card5];
    const labels = ["iPhone", "Macbook", "Airpods", "Apple Watch", "Apple Mini"];


    return (
      <>
        <Header logo={SiteLogo} />
        <Intro photo={IntroPhoto} />
        <Cards cards={cards} labels={labels}/>
      </>
    )
}

export default App
