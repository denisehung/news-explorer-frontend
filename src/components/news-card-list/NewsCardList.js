import React, { useState } from 'react';
import './NewsCardList.css';
import NewsCard from '../newsCard/NewsCard';
import cardsArray from '../../arrays/cardsArray';
const postsPerRow = 3;
// let arrayForHoldingPosts = [];

function NewsCardList(props) {
  const [displayedCards, setDisplayedCards] = useState([]);
  const [next, setNext] = useState(3);

  React.useEffect(() => {
    loopWithSlice(0, postsPerRow);
  }, []);

  function loopWithSlice(start, end) {
    setDisplayedCards(cardsArray.slice(start, end));
    // arrayForHoldingPosts = [...arrayForHoldingPosts, ...slicedPosts];
    // setDisplayedCards(arrayForHoldingPosts);
  }

  function handleShowMoreCards() {
    loopWithSlice(0, next + postsPerRow);
    setNext(next + postsPerRow);
    console.log(displayedCards);
  }

  return (
    <section className='news-card-list'>
      <div className='news-card-list__container'>
        {!props.isSavedArticlesPage && (
          <h3 className='news-card-list__title'>Search results</h3>
        )}
        <div className='news-card-list__card-grid'>
          {displayedCards.map((newscard) => (
            <NewsCard key={newscard.id} data={newscard} />
          ))}
        </div>
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
