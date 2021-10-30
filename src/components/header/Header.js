import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import MenuHamburgerIcon from '../../images/menu-hamburger-icon.svg';
import MenuCloseIcon from '../../images/menu-close-icon.svg';

function Header(props) {
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
    console.log(isMenuOpen);
  }

  return (
    <header className={`header ${isMenuOpen ? 'header_mobile-menu-open' : 'header_mobile-menu-closed'}`}>
      <NavLink className='header__logo' exact to='/'>
        NewsExplorer
      </NavLink>
      <img
        className='header__menu-icon'
        alt='menu icon'
        src={isMenuOpen ? MenuCloseIcon : MenuHamburgerIcon}
        onClick={onNavClick}
      />
      <div className={`header__navigation ${ mobileWidth && isMenuOpen ?  'header__navigation_type_mobile-active-logged-out' : 'header__navigation_type_mobile-inactive-logged-out'}`}>
        <NavLink
          className='header__home-link'
          activeClassName='header__active_color_white'
          exact
          to='/'
        >
          Home
        </NavLink>
        {props.loggedIn && (
          <NavLink
            className='header__saved-articles-link'
            activeClassName='header__active_color_white'
            to='/saved-articles'
          >
            Saved articles
          </NavLink>
        )}
        <NavLink
          className={`header__log-button ${
            props.loggedIn
              ? 'header__signout-button header__log-button_logged-in'
              : 'header__signin-button'
          }`}
          to=''
        >
          Sign In
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
