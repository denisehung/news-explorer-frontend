import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import MobileNavigationWrapper from '../mobile-navigation-wrapper/MobileNavigationWrapper';
import MenuHamburgerIcon from '../../images/menu-hamburger-icon.svg';
import MenuCloseIcon from '../../images/menu-close-icon.svg';
import MenuLogoutIconWhite from '../../images/menu-logout-icon_type_white.svg';

function Header({ loggedIn, setLoggedIn, onSignInClick }) {
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

  function onNavClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  function logOut() {
    setLoggedIn(false);
  }

  return loggedIn ? (
    <header
      className={`header ${
        isMenuOpen ? 'header_mobile-menu-open' : 'header_mobile-menu-closed'
      }`}
    >
      <NavLink className='header__logo' exact to='/'>
        NewsExplorer
      </NavLink>
      <img
        className='header__menu-icon'
        alt='menu icon'
        src={isMenuOpen ? MenuCloseIcon : MenuHamburgerIcon}
        onClick={onNavClick}
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
            className='header__link-home'
            activeClassName='header__active_color_white'
            exact
            to='/'
          >
            Home
          </NavLink>
          <NavLink
            className='header__link-saved-articles'
            activeClassName='header__active_color_white'
            to='/saved-articles'
          >
            Saved articles
          </NavLink>
          <NavLink
            className={
              'header__log-button header__signout-button header__log-button_logged-in'
            }
            to=''
            onClick={logOut}
          >
            <p className='header__log-button-username'>Colin</p>
            <img
              className='header__log-button-logout-icon'
              src={MenuLogoutIconWhite}
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
      <NavLink className='header__logo' exact to='/'>
        NewsExplorer
      </NavLink>
      <img
        className='header__menu-icon'
        alt='menu icon'
        src={isMenuOpen ? MenuCloseIcon : MenuHamburgerIcon}
        onClick={onNavClick}
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
