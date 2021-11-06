import React, { useState, useEffect, useCallback } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import SearchHero from './components/search-hero/SearchHero';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import NewsCardList from './components/news-card-list/NewsCardList';
import SavedNewsHeader from './components/saved-news-header/SavedNewsHeader';
import PreloaderAnimation from './components/preloader-animation/PreloaderAnimation';
import NoResults from './components/no-results/NoResults';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import SuccessPopup from './components/successPopup/SuccessPopup';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [isNewsCardListOpen, setIsNewsCardListOpen] = useState(false);
  const [onSavedArticlesPage, setOnSavedArticlesPage] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const location = useLocation().pathname.substring(1);

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const resetForm = useCallback(
    (
      newValues = { email: '', password: '', username: '' }, 
      newErrors = {}, 
      newIsValid = false) => {
        setValues(newValues);
        setErrors(newErrors);
        setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

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
        resetForm();
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, [resetForm]);

  function handleLogIn() {
    setLoggedIn(true);
    setIsSignInOpen(false);
    resetForm();
  }

  function handleRegister() {
    setIsSignUpOpen(false);
    setIsSuccessPopupOpen(true);
    resetForm();
  }

  function handleSignInClick() {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setIsSuccessPopupOpen(false);
    resetForm();
  }

  function handleSignUpClick() {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
    resetForm();
  }

  function closeAllPopups() {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setIsSuccessPopupOpen(false);
  }

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({...values, [name]: value});
    setErrors({...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());
  };

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
          <NewsCardList onSavedArticlesPage={onSavedArticlesPage} />
        {/*}  {(hasResults && isNewsCardListOpen) && (
            
          )} */}

         {/*} <PreloaderAnimation /> */}

          {(!hasResults && isNewsCardListOpen) && <NoResults />}

          <About />
        </Route>
        <ProtectedRoute path='/saved-articles' loggedIn={loggedIn}>
          <SavedNewsHeader />
          <NewsCardList onSavedArticlesPage={onSavedArticlesPage} />
        </ProtectedRoute>
      </Switch>
      <SignIn
        isValid={isValid}
        handleChange={handleChange}
        errors={errors}
        isOpen={isSignInOpen}
        onClose={closeAllPopups}
        onSignUpClick={handleSignUpClick}
        onLogInSubmit={handleLogIn}
      />
      <SignUp
        isValid={isValid}
        handleChange={handleChange}
        errors={errors}
        isOpen={isSignUpOpen}
        onClose={closeAllPopups}
        onSignInClick={handleSignInClick}
        onRegisterSubmit={handleRegister}
      />
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        onSignInClick={handleSignInClick}
      />
      <Footer />
    </>
  );
}

export default App;
