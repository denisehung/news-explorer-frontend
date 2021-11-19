import React, { useState, useEffect } from 'react';
import './NewsCard.css';

function NewsCard({ data, onSavedArticlesPage, loggedIn, onSaveArticleClick, onDeleteArticleClick, savedArticlesData, onSignInClick }) {
  const [isSaved, setIsSaved] = useState(false);

 useEffect(() => {
   if (savedArticlesData?.find((obj) => obj.title === data.title)) {
     setIsSaved(true);
   }
  }, [data.title, savedArticlesData]);

  function handleSave() {
    setIsSaved(!isSaved);
  }

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

    let articleDate = onSavedArticlesPage ? data.date : data.publishedAt; // original date in ISOstring format
    let newDate = new Date(articleDate?.slice(0, 10)); // get date without time
    let convertedDate = `${
      months[newDate.getMonth()]
    } ${newDate.getDate()},  ${newDate.getFullYear()}`; // convert date to correct format

    return convertedDate;
  }

  return onSavedArticlesPage ? (
    <div className='news-card'>
      <button className='news-card__button news-card__button_delete' onClick={() => onDeleteArticleClick(data)}></button>
      <div className='news-card__tag news-card__tag_type_tooltip'>
        Remove from saved
      </div>
      <div className='news-card__tag news-card__tag_type_keyword'>
        {data.keyword}
      </div>
      <a href={data.url} className="news-card__link" target="_blank" rel="noreferrer">
        <img
          src={data.image}
          alt={data.title}
          className="news-card__image"
        />
        <div className="news-card__wrapper">
          <p className="news-card__date">{convertDate()}</p>
          <h2 className="news-card__title">{data.title}</h2>
          <p className="news-card__description">{data.text}</p>
          <p className="news-card__source">{data.source}</p>
        </div>
      </a>
    </div>
  ) : (
    <div className='news-card'>
      <button
        className={`news-card__button news-card__button_save ${
          loggedIn && isSaved ? 'news-card__button_save_active' : ''
        }`}
        onClick={() => {
          onSaveArticleClick(data)
          handleSave();
          !loggedIn && onSignInClick(); // if user is not logged in, open sign in ppopup on click
        }}
      ></button>
      {!loggedIn && (
        <div className='news-card__tag news-card__tag_type_tooltip'>
          Sign in to save articles
        </div>
      )}
      <a href={data.url} className="news-card__link" target="_blank" rel="noreferrer">
        <img
          src={data.urlToImage}
          alt={data.title}
          className="news-card__image"
        />
        <div className="news-card__wrapper">
          <p className="news-card__date">{convertDate()}</p>
          <h2 className="news-card__title">{data.title}</h2>
          <p className="news-card__description">{data.description}</p>
          <p className="news-card__source">{data.source?.name}</p>
        </div>
      </a>
    </div>
  );
}

export default NewsCard;
