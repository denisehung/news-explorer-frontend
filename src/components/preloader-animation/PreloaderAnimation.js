import React from 'react';
import './PreloaderAnimation.css';
import PreloaderCircle from '../../images/preloader.png';

function PreloaderAnimation() {
  return (
    <section className='preloader'>
      <div className='preloader__container'>
        <img className='preloader__circle' src={PreloaderCircle} alt='' />
        <p className='preloader__description'>Searching for news...</p>
      </div>
    </section>
  );
}

export default PreloaderAnimation;
