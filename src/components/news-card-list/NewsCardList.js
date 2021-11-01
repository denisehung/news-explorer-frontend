import React from 'react';
import './NewsCardList.css';
import NewsCard from '../newsCard/NewsCard';

function NewsCardList(props) {
  return (
    <section className='news-card-list'>
      <div className='news-card-list__container'>
        {props.children}
        {props.cardsArray.map((newscard) => 
          <NewsCard data={newscard} />
        )}
        <button className="news-card-list__show-more-button">Show more</button>
      </div>
    </section>
  );
}

export default NewsCardList;
