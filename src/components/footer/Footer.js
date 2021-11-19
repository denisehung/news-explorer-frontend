import React from 'react';
import { NavLink } from 'react-router-dom';
import './Footer.css';
import FacebookIcon from '../../images/facebook-icon.svg';
import GithubIcon from '../../images/github-icon.svg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <p className="footer__copyright">
          © 2021 Supersite, Powered by News API
        </p>
        <nav className="footer__nav">
          <div className="footer__links">
            <NavLink to="/" className="footer__link">
              Home
            </NavLink>
            <a
              href="https://practicum.yandex.com/profile/web/"
              className="footer__link"
              target="_blank"
              rel="noreferrer"
            >
              Practicum by Yandex
            </a>
          </div>
          <div className="footer__social">
            <a
              href="https://github.com/cjmaret/news-explorer-frontend"
              target="_blank"
              rel="noreferrer"
            >
              <img
                src={GithubIcon}
                alt="Github icon"
                className="footer__icon footer__icon_type_github"
              />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
              <img
                src={FacebookIcon}
                alt="Facebook icon"
                className="footer__icon footer__icon_type_facebook"
              />
            </a>
          </div>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
