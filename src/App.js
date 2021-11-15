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
import CurrentUserContext from './contexts/CurrentUserContext';
import mainApi from './utils/mainApi';
import newsApi from './utils/newsApi';
import * as auth from './utils/auth';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [isNewsCardListOpen, setIsNewsCardListOpen] = useState(false);
  const [onSavedArticlesPage, setOnSavedArticlesPage] = useState(false);
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [hasResults, setHasResults] = useState(false);
  const location = useLocation().pathname.substring(1);
  const [savedArticlesData, setSavedArticlesData] = useState([]);

  // Check user token
  useEffect(() => {
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setLoggedIn(true);
          history.push('/');
        })
        .catch((err) => console.log(err));
    }
  }, [history, token]);

  // Get current user info
  useEffect(() => {
    mainApi
      .getCurrentUser(token)
      .then((res) => {
        setCurrentUser(res.user);
      })
      .catch((err) => console.log(err));
  }, [token]);

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

  // if search keyword, immediately set results to true
  // useEffect(() => {
  //   if (searchKeyword) {
  //     setHasResults(true);
  //   } else {
  //     setHasResults(false);
  //   }
  // }, [searchKeyword]);

  function handleRegisterSubmit(email, password, name) {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          handleRegister();
        } else {
          setIsRegistered(false);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleLoginSubmit(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          handleLogin();
          history.push('/');
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSaveArticle(data) {
    mainApi
      .saveArticle(data, searchKeyword, token)
      .then((data) => {
        if (data) {
          console.log(data);
          setSavedArticlesData(data);
        }
      })
      .catch((err) => console.log(err));
  }

  function handleSearchSubmit(keyword) {
    setIsLoading(true);
    newsApi
      .searchArticles(keyword)
      .then((res) => {
        setCards(res);
        if (res.length === 0) {
          setHasResults(false);
        } else {
          setHasResults(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
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
    <CurrentUserContext.Provider value={currentUser}>
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
              onSearch={handleSearchSubmit}
              searchKeyword={searchKeyword}
              setSearchKeyword={setSearchKeyword}
              setIsNewsCardListOpen={setIsNewsCardListOpen}
            />

            {hasResults && isNewsCardListOpen && (
              <NewsCardList
                onSavedArticlesPage={onSavedArticlesPage}
                loggedIn={loggedIn}
                cards={cards}
                handleSaveArticleClick={handleSaveArticle}
              />
            )}
            {isLoading && <PreloaderAnimation />}
            {!hasResults && !isLoading && isNewsCardListOpen && <NoResults />}
            <About />
          </Route>
          <ProtectedRoute path='/saved-articles' loggedIn={loggedIn}>
            <SavedNewsHeader currentUser={currentUser} />
            <NewsCardList
              onSavedArticlesPage={onSavedArticlesPage}
              loggedIn={loggedIn}
              savedArticlesData={savedArticlesData}
              setSavedArticlesData={setSavedArticlesData}
              token={token}
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
          isRegistered={isRegistered}
        />
        <Footer />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
