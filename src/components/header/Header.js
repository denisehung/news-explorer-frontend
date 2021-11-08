import React, { useState, useEffect, createRef } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import MobileNavigationWrapper from '../mobile-navigation-wrapper/MobileNavigationWrapper';
import MenuHamburgerIconWhite from '../../images/menu-hamburger-icon_type_white.svg';
import MenuHamburgerIconBlack from '../../images/menu-hamburger-icon_type_black.svg';
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
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileWidth, setMobileWidth] = useState(false);
  const [hamburgerDisplay, setHamburgerDisplay] = useState();
  const [logoutIconDisplay, setLogooutIconDisplay] = useState();
  let wrapperRef = createRef();

  useEffect(() => {
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

  // displays either white/black hamburger icon, or X icon, depending on menu and savedArticles state
  useEffect(() => {
    if (!isMenuOpen && onSavedArticlesPage) {
      setHamburgerDisplay(MenuHamburgerIconBlack);
    } else if (!isMenuOpen && !onSavedArticlesPage) {
      setHamburgerDisplay(MenuHamburgerIconWhite);
    } else if (isMenuOpen) {
      setHamburgerDisplay(MenuCloseIcon);
    }
  }, [isMenuOpen, onSavedArticlesPage]);

  // displays white or black logout icon (in log button), depending on menu and savedArticles state
  useEffect(() => {
    if (mobileWidth) {
      setLogooutIconDisplay(MenuLogoutIconWhite);
    } else if (onSavedArticlesPage) {
      setLogooutIconDisplay(MenuLogoutIconBlack);
    } else if (!onSavedArticlesPage) {
      setLogooutIconDisplay(MenuLogoutIconWhite);
    }
  }, [mobileWidth, onSavedArticlesPage]);

  // eventlistener to close menu on click outside
  React.useEffect((e) => {
    window.addEventListener('click', closeOnClickOutside);
    return () => window.removeEventListener('click', closeOnClickOutside);
  });

  // function to close menu by clicking outside
  function closeOnClickOutside(e) {
    console.log(e.target);
    if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  }

  // Close menu with Escape button
  React.useEffect(() => {
    const closeByEscape = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('keydown', closeByEscape);
    return () => document.removeEventListener('keydown', closeByEscape);
  }, []);

  function onHamburgerClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleNavClick() {
    setIsMenuOpen(false);
    setIsNewsCardListOpen(false);
    setSearchKeyword('');
  }

  function handleLogButtonClick() {
    onSignInClick();
    handleNavClick();
  }

  // function logIn() {
  //   setLoggedIn(true)
  // };

  function logOut() {
    handleNavClick();
    setLoggedIn(false);
  }

  return loggedIn ? (
    <header
      ref={wrapperRef}
      className={`header ${
        isMenuOpen ? 'header_mobile-menu-open' : 'header_mobile-menu-closed'
      }`}
    >
      <NavLink
        className={`header__logo ${
          onSavedArticlesPage && 'header__logo_saved-articles'
        } ${isMenuOpen && 'header__logo_menu-open'}`}
        exact
        to='/'
        onClick={handleNavClick}
      >
        NewsExplorer
      </NavLink>
      <img
        className='header__menu-icon'
        alt='menu icon'
        src={hamburgerDisplay}
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
            onClick={handleNavClick}
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
            onClick={handleNavClick}
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
              src={logoutIconDisplay}
              alt=''
            />
          </NavLink>
        </MobileNavigationWrapper>
      </div>
    </header>
  ) : (
    <header
      ref={wrapperRef}
      className={`header ${
        isMenuOpen ? 'header_mobile-menu-open' : 'header_mobile-menu-closed'
      }`}
    >
      <NavLink className='header__logo' exact to='/' onClick={handleNavClick}>
        NewsExplorer
      </NavLink>
      <img
        className='header__menu-icon'
        alt='menu icon'
        src={hamburgerDisplay}
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
            onClick={handleNavClick}
          >
            Home
          </NavLink>
          <NavLink
            className={
              'header__log-button header__signin-button header__log-button_logged-out'
            }
            to=''
            onClick={handleLogButtonClick}
          >
            Sign In
          </NavLink>
        </MobileNavigationWrapper>
      </div>
    </header>
  );
}

export default Header;
