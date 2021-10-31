import React from 'react';
import './App.css';
import Header from './components/header/Header';
import SearchHero from './components/search-hero/SearchHero';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <SearchHero />
    </>
  );
}

export default App;
