import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../news-card/NewsCard';
import cardsArray from '../../arrays/cardsArray';

function NewsCardList({ cards, onSavedArticlesPage, loggedIn }) {
  const [displayedCards, setDisplayedCards] = useState([]);
  const [next, setNext] = useState(3);

  // start with 3 news cards (on saved-articles, show all cards)
  React.useEffect(() => {
    if (!onSavedArticlesPage) {
      setDisplayedCards(cards.slice(0, 3));
    } else {
      setDisplayedCards(cards);
    }
  }, [cards, onSavedArticlesPage]);

  // on each click, add 3 cards to the 'next' variable, increase 'next' value by 3
  function handleShowMoreCards() {
    setDisplayedCards(cards.slice(0, next + 3));
    setNext(next + 3);
  }

  return (
    <section
      className={`news-card-list ${
        onSavedArticlesPage && 'news-card-list_saved-articles'
      }`}
    >
      <div className='news-card-list__container'>
        {!onSavedArticlesPage && (
          <h3 className='news-card-list__title'>Search results</h3>
        )}
        <ul
          className={`news-card-list__card-grid ${
            onSavedArticlesPage && 'news-card-list__card-grid_saved-articles'
          }`}
        >
          {displayedCards.map((newscard, index) => (
            <li className='news-card-list__card' key={index}>
              <NewsCard
                data={newscard}
                onSavedArticlesPage={onSavedArticlesPage}
                loggedIn={loggedIn}
              />
            </li>
          ))}
        </ul>
        {!onSavedArticlesPage && (
          <button
            className='news-card-list__show-more-button'
            onClick={handleShowMoreCards}
          >
            Show more
          </button>
        )}
      </div>
    </section>
  );
}

export default NewsCardList;

// function which might be needed when we grab the data from the news API

// const postsPerRow = 3;
// let arrayForHoldingPosts = [];

// function NewsCardList(props) {
//   const [displayedCards, setDisplayedCards] = useState([]);
//   const [next, setNext] = useState(3);

//   React.useEffect(() => {
//     loopWithSlice(0, postsPerRow);
//   }, []);

//   function loopWithSlice(start, end) {
//     const slicedPosts = cardsArray.slice(start, end);
//     arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
//     setDisplayedCards(arrayForHoldingPosts);
//   }

//   function handleShowMoreCards() {
//     loopWithSlice(0, next + postsPerRow);
//     setNext(next + postsPerRow);
//   };
