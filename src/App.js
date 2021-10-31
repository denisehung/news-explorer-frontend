import React from 'react';
import './App.css';
import Header from './components/header/Header';
import SearchHero from './components/search-hero/SearchHero';
import About from './components/about/About';
import Footer from './components/footer/Footer';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <SearchHero />
      <About />
      <Footer />
    </>
  );
}

export default App;