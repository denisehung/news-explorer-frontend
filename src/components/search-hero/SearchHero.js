import React, { useState } from 'react';
import './SearchHero.css';

function SearchHero({
  searchKeyword,
  setSearchKeyword,
  onSearch,
}) {
  const [formInputValue, setFormInputValue] = useState('');
  const [placeholderText, setPlaceholderText] = useState('Enter topic');

  function handleChange(e) {
    setSearchKeyword(e.target.value);
    setFormInputValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!formInputValue) {
      setPlaceholderText('Please enter a keyword');
    } else {
      //api call to PUT the keyword into the filter...
      onSearch(searchKeyword);
    }
  }

  return (
    <section className="search-hero">
      <div className="search-hero__container">
        <h1 className="search-hero__title">What's going on in the world?</h1>
        <p className="search-hero__description">
          Find the latest news on any topic and save them in your personal
          account.
        </p>
        <form className="search-hero__search-container" onSubmit={handleSubmit}>
          <input
            className="search-hero__input"
            placeholder={placeholderText}
            value={formInputValue}
            onChange={handleChange}
          ></input>
          <button className="search-hero__button" type="submit">
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default SearchHero;
