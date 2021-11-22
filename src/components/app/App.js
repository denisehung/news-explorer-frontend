import React, { useState, useEffect } from 'react';
import { Switch, Route, useLocation, useHistory } from 'react-router-dom';
import './App.css';
import Header from '../header/Header';
import SearchHero from '../search-hero/SearchHero';
import About from '../about/About';
import Footer from '../footer/Footer';
import SignIn from '../sign-in/SignIn';
import SignUp from '../sign-up/SignUp';
import NewsCardList from '../news-card-list/NewsCardList';
import SavedNewsHeader from '../saved-news-header/SavedNewsHeader';
import PreloaderAnimation from '../preloader-animation/PreloaderAnimation';
import NoResults from '../no-results/NoResults';
import ProtectedRoute from '../protected-route/ProtectedRoute';
import SuccessPopup from '../success-popup/SuccessPopup';
import CurrentUserContext from '../../contexts/CurrentUserContext';
import mainApi from '../../utils/mainApi';
import newsApi from '../../utils/newsApi';
import * as auth from '../../utils/auth';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({});
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
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
  const [hasError, setHasError] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [displayedCards, setDisplayedCards] = useState([]);
  const [savedCardsArray, setSavedCardsArray] = useState([]);

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

  // get saved-articles to compare with bookmark POST request
  useEffect(() => {
    mainApi
      .getArticles(token)
      .then((res) => {
        // setDisplayedCards(res.articles);
        setSavedArticles(res.articles);
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

  function handleRegisterSubmit(email, password, name) {
    auth
      .register(email, password, name)
      .then((res) => {
        if (res) {
          setIsRegistered(true);
          handleRegister();
        } else {
          setIsRegistered(false);
          setHasError(true);
        }
      })
      .catch((err) => {
        console.log(`This email is unavailable: ${err.message}`);
      });
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
      .catch((err) => {
        console.log(`Incorrect email or password: ${err.message}`);
        setHasError(true);
      });
  }

  // saves article, adds to array of articles
  function handleSaveArticle(data) {
    if (!savedArticles.find((obj) => obj.title === data.title)) {
      mainApi
        .saveArticle(data, searchKeyword, token)
        .then((data) => {
          if (data) {
            setSavedArticles((savedArticles) => [
              ...savedArticles,
              data.article,
            ]);
            console.log('article saved!');
          }
        })
        .catch((err) => console.log(err));
    } else {
      console.log('thats already saved!');
    }
  }

  // deletes article, removes from array
  function handleDeleteArticle(data) {
    let articleId;

    // if on homepage, find the corresponding saved article that matches the news API article, and save its ID to articleId. if on saved articles page, simply save the data ID to articleID.
    if (!onSavedArticlesPage) {
      if (savedArticles.find((obj) => obj.link === data.url)) {
        const article = savedArticles.find((obj) => {
          return obj.link === data.url;
        });
        articleId = article._id;
      } else {
        console.log('that card doesnt exist!');
      }
    } else {
      articleId = data._id;
    }

    mainApi
      .deleteArticle(articleId, token)
      .then((data) => {
        setSavedArticles(
          savedArticles.filter((obj) => obj._id !== data.article._id)
        );
      })
      .catch((err) => console.log(err));
  }

  function handleSearchSubmit(keyword) {
    setIsNewsCardListOpen(false);
    setIsLoading(true);
    newsApi
      .searchArticles(keyword)
      .then((res) => {
        setIsNewsCardListOpen(true);
        setCards(res);
        if (res.length === 0) {
          setHasResults(false);
        } else {
          setHasResults(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogOut() {
    setLoggedIn(false);
    localStorage.removeItem('token');
    history.push('/');
  }

  function handleLogin() {
    setHasError(false);
    setLoggedIn(true);
    setIsSignInOpen(false);
  }

  function handleRegister() {
    setHasError(false);
    setIsSignUpOpen(false);
    setIsSuccessPopupOpen(true);
  }

  function handleSignInClick() {
    setHasError(false);
    setIsSignInOpen(true);
    setIsSignUpOpen(false);
    setIsSuccessPopupOpen(false);
  }

  function handleSignUpClick() {
    setHasError(false);
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
      <div className="page">
        <Header
          loggedIn={loggedIn}
          currentUser={currentUser}
          setLoggedIn={setLoggedIn}
          onSignInClick={handleSignInClick}
          setIsNewsCardListOpen={setIsNewsCardListOpen}
          setSearchKeyword={setSearchKeyword}
          onSavedArticlesPage={onSavedArticlesPage}
          onLogOut={handleLogOut}
        />
        <Switch>
          <Route exact path="/">
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
                savedArticles={savedArticles}
                onSaveArticleClick={handleSaveArticle}
                onDeleteArticleClick={handleDeleteArticle}
                displayedCards={displayedCards}
                setDisplayedCards={setDisplayedCards}
                onSignInClick={handleSignInClick}
              />
            )}
            {isLoading && <PreloaderAnimation />}
            {!hasResults && !isLoading && isNewsCardListOpen && (
              <NoResults hasError={hasError} />
            )}
            <About />
          </Route>
          <ProtectedRoute path="/saved-articles" loggedIn={loggedIn}>
            <SavedNewsHeader
              currentUser={currentUser}
              savedArticles={savedArticles}
            />
            <NewsCardList
              onSavedArticlesPage={onSavedArticlesPage}
              loggedIn={loggedIn}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
              token={token}
              displayedCards={displayedCards}
              setDisplayedCards={setDisplayedCards}
              savedCardsArray={savedCardsArray}
              setSavedCardsArray={setSavedCardsArray}
              onDeleteArticleClick={handleDeleteArticle}
            />
          </ProtectedRoute>
        </Switch>
        <SignIn
          isOpen={isSignInOpen}
          onClose={closeAllPopups}
          onSignUpClick={handleSignUpClick}
          onLogInSubmit={handleLoginSubmit}
          hasError={hasError}
        />
        <SignUp
          isOpen={isSignUpOpen}
          onClose={closeAllPopups}
          onSignInClick={handleSignInClick}
          onRegisterSubmit={handleRegisterSubmit}
          hasError={hasError}
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
