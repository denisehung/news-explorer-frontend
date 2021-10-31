import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/Header';
import SearchHero from './components/search-hero/SearchHero';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
// import SuccessPopup from './components/successPopup/SuccessPopup';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // Close popup with Escape button
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', closeByEscape)
    return () => document.removeEventListener('keydown', closeByEscape)
  }, []);

  function handleSignInClick() {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
  }

  function handleSignUpClick() {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  }

  function closeAllPopups() {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
  }

  return (
    <>
      <Header 
        loggedIn={loggedIn} 
        setLoggedIn={setLoggedIn} 
        onSignInClick={handleSignInClick}
      />
      <SearchHero />
      <About />
      <Footer />
      <SignIn 
        isOpen={isSignInOpen}
        onClose={closeAllPopups}
        onSignUpClick={handleSignUpClick} 
      />
      <SignUp
        isOpen={isSignUpOpen}
        onClose={closeAllPopups}
        onSignInClick={handleSignInClick}
      />
    </>
  );
}

export default App;