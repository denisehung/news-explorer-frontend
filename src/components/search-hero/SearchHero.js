import React from 'react';
import './SearchHero.css';

function SearchHero({
  searchKeyword,
  setSearchKeyword,
  setIsNewsCardListOpen,
}) {
  function handleChange(e) {
    setSearchKeyword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    //api call to PUT the keyword into the filter...
    setIsNewsCardListOpen(true);
    console.log('form submitted');
    setSearchKeyword('');
  }

  return (
    <section className='search-hero'>
      <div className='search-hero__container'>
        <h1 className='search-hero__title'>What's going on in the world?</h1>
        <p className='search-hero__description'>
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form className='search-hero__search-container' onSubmit={handleSubmit}>
          <input
            className='search-hero__input'
            placeholder='Enter topic'
            value={searchKeyword}
            onChange={handleChange}
          ></input>
          <button className='search-hero__button' type='submit'>
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchHero;
