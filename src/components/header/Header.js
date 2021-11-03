import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import MobileNavigationWrapper from '../mobile-navigation-wrapper/MobileNavigationWrapper';
import MenuHamburgerIcon from '../../images/menu-hamburger-icon.svg';
import MenuCloseIcon from '../../images/menu-close-icon.svg';
import MenuLogoutIconWhite from '../../images/menu-logout-icon_type_white.svg';
import MenuLogoutIconBlack from '../../images/menu-logout-icon_type_black.svg';

function Header({
  loggedIn,
  setLoggedIn,
  onSignInClick,
  setIsNewsCardListOpen,
  setSearchKeyword,
  onSavedArticlesPage,
  setOnSavedArticlesPage,
}) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [mobileWidth, setMobileWidth] = React.useState(false);

  React.useState(() => {
    function checkWidth() {
      const windowWidth = window.matchMedia('(max-width: 520px)');
      if (windowWidth.matches) {
        setMobileWidth(true);
      } else {
        setMobileWidth(false);
      }
    }
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => window.removeEventListener('resize', checkWidth);
  });

  function onHamburgerClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function resetSearchResults() {
    setIsNewsCardListOpen(false);
    setSearchKeyword('');
  }

  // function logIn() {
  //   setLoggedIn(true)
  // };

  function logOut() {
    setLoggedIn(false);
    resetSearchResults();
  }

  return loggedIn ? (
    <header
      className={`header ${
        isMenuOpen ? 'header_mobile-menu-open' : 'header_mobile-menu-closed'
      }`}
    >
      <NavLink
        className={`header__logo ${
          onSavedArticlesPage && 'header__logo_saved-articles '
        }`}
        exact
        to='/'
        onClick={resetSearchResults}
      >
        NewsExplorer
      </NavLink>
      <img
        className='header__menu-icon'
        alt='menu icon'
        src={isMenuOpen ? MenuCloseIcon : MenuHamburgerIcon}
        onClick={onHamburgerClick}
      />
      <div
        className={`header__navigation ${
          mobileWidth && isMenuOpen
            ? 'header__navigation_type_mobile-active-logged-in'
            : 'header__navigation_type_mobile-inactive'
        }`}
      >
        <MobileNavigationWrapper mobileWidth={mobileWidth}>
          <NavLink
            className={`header__link-home ${
              onSavedArticlesPage && 'header_color_black'
            }`}
            activeClassName={
              onSavedArticlesPage
                ? 'header__active_color_black'
                : 'header__active_color_white'
            }
            exact
            to='/'
            onClick={resetSearchResults}
          >
            Home
          </NavLink>
          <NavLink
            className={`header__link-saved-articles ${
              onSavedArticlesPage && 'header_color_black'
            }`}
            activeClassName={
              onSavedArticlesPage
                ? 'header__active_color_black'
                : 'header__active_color_white'
            }
            to='/saved-articles'
          >
            Saved articles
          </NavLink>
          <NavLink
            className={`header__log-button header__signout-button header__log-button_logged-in ${
              onSavedArticlesPage && 'header__log-button_saved-articles'
            }`}
            to=''
            onClick={logOut}
          >
            <p className='header__log-button-username'>Colin</p>
            <img
              className='header__log-button-logout-icon'
              src={
                onSavedArticlesPage ? MenuLogoutIconBlack : MenuLogoutIconWhite
              }
              alt=''
            />
          </NavLink>
        </MobileNavigationWrapper>
      </div>
    </header>
  ) : (
    <header
      className={`header ${
        isMenuOpen ? 'header_mobile-menu-open' : 'header_mobile-menu-closed'
      }`}
    >
      <NavLink
        className='header__logo'
        exact
        to='/'
        onClick={resetSearchResults}
      >
        NewsExplorer
      </NavLink>
      <img
        className='header__menu-icon'
        alt='menu icon'
        src={isMenuOpen ? MenuCloseIcon : MenuHamburgerIcon}
        onClick={onHamburgerClick}
      />
      <div
        className={`header__navigation ${
          mobileWidth && isMenuOpen
            ? 'header__navigation_type_mobile-active-logged-out'
            : 'header__navigation_type_mobile-inactive'
        }`}
      >
        <MobileNavigationWrapper mobileWidth={mobileWidth}>
          <NavLink
            className='header__link-home'
            activeClassName='header__active_color_white'
            exact
            to='/'
            onClick={resetSearchResults}
          >
            Home
          </NavLink>
          <NavLink
            className={
              'header__log-button header__signin-button header__log-button_logged-out'
            }
            to=''
            onClick={onSignInClick}
          >
            Sign In
          </NavLink>
        </MobileNavigationWrapper>
      </div>
    </header>
  );
}

export default Header;
