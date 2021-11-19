import React, { useState, useEffect } from 'react';
import './NewsCardList.css';
import NewsCard from '../news-card/NewsCard';
import mainApi from '../../utils/mainApi';

function NewsCardList({
  onSavedArticlesPage,
  loggedIn,
  cards,
  savedArticlesData,
  setSavedArticlesData,
  displayedCards,
  setDisplayedCards,
  onSaveArticleClick,
  onDeleteArticleClick,
  token,
}) {
  const [next, setNext] = useState(3);

  // start with 3 news cards (on saved-articles, show all cards)
  useEffect(() => {
    if (!onSavedArticlesPage) {
      setDisplayedCards(cards?.slice(0, 3));
    } else {
      setDisplayedCards(savedArticlesData);
    }
  }, [cards, onSavedArticlesPage, savedArticlesData]);

  // on each click, add 3 cards to the 'next' variable, increase 'next' value by 3
  function handleShowMoreCards() {
    setDisplayedCards(cards.slice(0, next + 3));
    setNext(next + 3);
  }

  return onSavedArticlesPage ? (
    <section className='news-card-list news-card-list_saved-articles'>
      <div className='news-card-list__container'>
        <ul className='news-card-list__card-grid news-card-list__card-grid_saved-articles'>
          {displayedCards?.map((newscard) => (
            <li className='news-card-list__card' key={newscard._id}>
              <NewsCard
                data={newscard}
                onSavedArticlesPage={onSavedArticlesPage}
                loggedIn={loggedIn}
                onDeleteArticleClick={onDeleteArticleClick}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  ) : (
    <section className='news-card-list'>
      <div className='news-card-list__container'>
        <h3 className='news-card-list__title'>Search results</h3>
        <ul className='news-card-list__card-grid'>
          {displayedCards?.map((newscard, index) => (
            <li className='news-card-list__card' key={index}>
              <NewsCard
                data={newscard}
                onSavedArticlesPage={onSavedArticlesPage}
                loggedIn={loggedIn}
                onSaveArticleClick={onSaveArticleClick}
                savedArticlesData={savedArticlesData}
              />
            </li>
          ))}
        </ul>
        <button
          className='news-card-list__show-more-button'
          onClick={handleShowMoreCards}
        >
          Show more
        </button>
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
