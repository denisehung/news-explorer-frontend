import React from 'react';
import './SearchHero.css';

function SearchHero() {
  return (
    <section className='search-hero'>
      <div className='search-hero__container'>
        <h1 className='search-hero__title'>What's going on in the world?</h1>
        <p className='search-hero__description'>
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <div className='search-hero__search-container'>
          <input
            className='search-hero__input'
            placeholder='Enter topic'
          ></input>
          <button className='search-hero__button' type='submit'>
            Search
          </button>
        </div>
      </div>
    </section>
  );
}

export default SearchHero;
