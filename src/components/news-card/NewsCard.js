import React, { useState, useEffect } from 'react';
import './NewsCard.css';

function NewsCard({ data, onSavedArticlesPage, loggedIn, onSaveArticleClick }) {
  const [isSaved, setIsSaved] = useState(false);

  // function handleSave() {
  //   setIsSaved(!isSaved);
  // }

  function convertDate() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    let articleDate = data.publishedAt; // original date in ISOstring format
    let newDate = new Date(articleDate.slice(0, 10)); // get date without time
    let convertedDate = `${months[newDate.getMonth()]} ${newDate.getDate()},  ${newDate.getFullYear()}`; // convert date to correct format

    return convertedDate;
  }

  return (
    <div className='news-card'>
      <img src={data.urlToImage} alt={data.title} className='news-card__image' />

      {onSavedArticlesPage ? (
        <>
          <button className='news-card__button news-card__button_delete'></button>
          <div className='news-card__tag news-card__tag_type_tooltip'>
            Remove from saved
          </div>
          <div className='news-card__tag news-card__tag_type_keyword'>
            Keyword
          </div>
        </>
      ) : (
        <>
          <button
            className={`news-card__button news-card__button_save ${
              loggedIn && isSaved ? 'news-card__button_save_active' : ''
            }`}
            onClick={() => onSaveArticleClick(data)}
          ></button>
          {!loggedIn && (
            <div className='news-card__tag news-card__tag_type_tooltip'>
              Sign in to save articles
            </div>
          )}
        </>
      )}
      <div className='news-card__details'>
        <p className='news-card__date'>{convertDate()}</p>
        <h2 className='news-card__title'>{data.title}</h2>
        <p className='news-card__description'>{data.description}</p>
        <p className='news-card__source'>{data.source.name}</p>
      </div>
    </div>
  );
}

export default NewsCard;
