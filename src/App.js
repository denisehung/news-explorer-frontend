import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import './App.css';
import Header from './components/header/Header';
import SearchHero from './components/search-hero/SearchHero';
import About from './components/about/About';
import Footer from './components/footer/Footer';
import SignIn from './components/sign-in/SignIn';
import SignUp from './components/sign-up/SignUp';
import NewsCardList from './components/news-card-list/NewsCardList';
import SavedNewsHeader from './components/saved-news-header/SavedNewsHeader';
import PreloaderAnimation from './components/preloader-animation/PreloaderAnimation';
import NoResults from './components/no-results/NoResults';
import ProtectedRoute from './components/protected-route/ProtectedRoute';
import SuccessPopup from './components/success-popup/SuccessPopup';
import mainApi from './utils/mainApi';
import newsApi from './utils/newsApi';
import * as auth from './utils/auth';
import api from './utils/mainApi';

function App() {
  const history = useHistory();
  const [token, setToken] = React.useState(localStorage.getItem('token'));
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [currentUser, setCurrentUser] = useState();
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [isNewsCardListOpen, setIsNewsCardListOpen] = useState(false);
  const [onSavedArticlesPage, setOnSavedArticlesPage] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const location = useLocation().pathname.substring(1);

  React.useEffect(() => {
    handleTokenCheck();
  }, [token]);

  function handleTokenCheck() {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (!res) {
            return res.status(400).send({
              message: 'Token not provided or provided in the wrong format',
            });
          }
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => console.log(err));
    }
  }

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

  useEffect(() => {
    if (searchKeyword) {
      setHasResults(true);
    } else {
      setHasResults(false);
    }
  });

  function handleLoginSubmit(e) {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setEmail('');
          setPassword('');
          handleLogin(e);
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  }

  function handleRegisterSubmit(e) {
    e.preventDefault();
    //some stuff
      handleRegister();
  }

  function handleLogin() {
    setLoggedIn(true);
    setIsSignInOpen(false);
  }

  function handleRegister() {
    setIsSignUpOpen(false);
    setIsSuccessPopupOpen(true);
  }

  function handleSignInClick() {
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setIsSuccessPopupOpen(false);
  }

  function handleSignUpClick() {
    setIsSignUpOpen(true);
    setIsSignInOpen(false);
  }

  function closeAllPopups() {
    setIsSignInOpen(false);
    setIsSignUpOpen(false);
    setIsSuccessPopupOpen(false);
  }

  return (
    <div className='page'>
      <Header
        loggedIn={loggedIn}
        currentUser={currentUser}
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
          <NewsCardList
            onSavedArticlesPage={onSavedArticlesPage}
            loggedIn={loggedIn}
          />
          {/*{hasResults && isNewsCardListOpen && (
            
          )}*/}
          {/* <PreloaderAnimation /> */}
          {!hasResults && isNewsCardListOpen && <NoResults />}
          <About />
        </Route>
        <ProtectedRoute path='/saved-articles' loggedIn={loggedIn}>
          <SavedNewsHeader />
          <NewsCardList
            onSavedArticlesPage={onSavedArticlesPage}
            loggedIn={loggedIn}
          />
        </ProtectedRoute>
      </Switch>
      <SignIn
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        isOpen={isSignInOpen}
        onClose={closeAllPopups}
        onSignUpClick={handleSignUpClick}
        onLogInSubmit={handleLoginSubmit}
      />
      <SignUp
        email={email}
        password={password}
        setEmail={setEmail}
        setPassword={setPassword}
        isOpen={isSignUpOpen}
        onClose={closeAllPopups}
        onSignInClick={handleSignInClick}
        onRegisterSubmit={handleRegisterSubmit}
      />
      <SuccessPopup
        isOpen={isSuccessPopupOpen}
        onClose={closeAllPopups}
        onSignInClick={handleSignInClick}
      />
      <Footer />
    </div>
  );
}

export default App;
