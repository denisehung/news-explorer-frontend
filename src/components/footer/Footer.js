import React from 'react';
import './Footer.css';
import FacebookIcon from '../../images/facebook-icon.svg';
import GithubIcon from '../../images/github-icon.svg';

export default function Footer() {
  return (
    <section className="footer">
      <div className="footer__content">
        <p className="footer__copyright">© 2021 Supersite, Powered by News API</p>
        <div className="footer__nav">
          <div className="footer__links">
            <p className="footer__link">Home</p>
            <p className="footer__link">Practicum by Yandex</p>
          </div>
          <div className="footer__social">
            <img src={GithubIcon} alt='Github icon' className="footer__github-icon"/>
            <img src={FacebookIcon} alt='Facebook icon' className="footer__facebook-icon"/>
          </div>
        </div>
      </div>
    </section>
  )
}