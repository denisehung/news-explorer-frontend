import React from 'react';
import './Footer.css';
import FacebookIcon from '../../images/facebook-icon.svg';
import GithubIcon from '../../images/github-icon.svg';

function Footer() {
  return (
    <section className="footer">
      <div className="footer__content">
        <p className="footer__copyright">© 2021 Supersite, Powered by News API</p>
        <div className="footer__nav">
          <div className="footer__links">
            <a href="#home" className="footer__link">Home</a>
            <a href="https://practicum.yandex.com/profile/web/" className="footer__link">Practicum by Yandex</a>
          </div>
          <div className="footer__social">
            <img src={GithubIcon} alt='Github icon' className="footer__icon footer__icon_type_github"/>
            <img src={FacebookIcon} alt='Facebook icon' className="footer__icon footer__icon_type_facebook"/>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Footer;