import React from 'react';
import './App.css';
import Header from './components/header/Header';
import SearchHero from './components/search-hero/SearchHero';

function App() {
  const [loggedIn, setLogged] = React.useState(true);

  return (
    <>
      <Header loggedIn={loggedIn} />
      <SearchHero />
    </>
  );
}

export default App;
