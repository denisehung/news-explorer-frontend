import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import SearchHero from './components/search-hero/SearchHero';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import NewsCardList from './components/news-card-list/NewsCardList';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
// import SuccessPopup from './components/successPopup/SuccessPopup';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [isNewsCardListOpen, setIsNewsCardListOpen] = useState(false);
  const [onSavedArticlesPage, setOnSavedArticlesPage] = useState(false);

  const location = useLocation().pathname.substring(1);

  //determine if user is on saved-articles page
  useEffect(() => {
    const savedArticlesPath = ['saved-articles'];
    if (savedArticlesPath.includes(location)) {
      setOnSavedArticlesPage(true);
    } else {
      setOnSavedArticlesPage(false);
    }
  }, [location]);

  // Close popup with Escape button
  useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        closeAllPopups();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
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
        setIsNewsCardListOpen={setIsNewsCardListOpen}
        setSearchKeyword={setSearchKeyword}
        onSavedArticlesPage={onSavedArticlesPage}
      />
      <Switch>
        <Route exact path='/'>
          <SearchHero
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
            setIsNewsCardListOpen={setIsNewsCardListOpen}
          />
          {isNewsCardListOpen && (
            <NewsCardList
              onSavedArticlesPage={onSavedArticlesPage}
              setOnSavedArticlesPage={setOnSavedArticlesPage}
            />
          )}
          <About />
        </Route>
        <ProtectedRoute path='/saved-articles' loggedIn={loggedIn}>
          <NewsCardList
            onSavedArticlesPage={onSavedArticlesPage}
            setOnSavedArticlesPage={setOnSavedArticlesPage}
          />
        </ProtectedRoute>
      </Switch>
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
      <Footer />
    </>
  );
}

export default App;
