import React, { useState } from 'react';
import './NewsCard.css';

function NewsCard({ data, onSavedArticlesPage, loggedIn }) {
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleSave() {
    setIsSaved(!isSaved);
  }

  function handleHover() {
    setIsHovered(!isHovered);
  }

  return (
    <div className='news-card'>
      <img src={data.image} alt={data.alt} className='news-card__image' />

      {!onSavedArticlesPage && (
        <>
          <button
            className={`news-card__button news-card__button_save ${loggedIn &&
              isSaved ? 'news-card__button_save_active' : ''
            }`}
            onClick={handleSave}
            onMouseEnter={handleHover}
            onMouseLeave={handleHover}
          ></button>
          {!loggedIn && isHovered && (
            <div className='news-card__tag news-card__tag_type_tooltip'>
              Sign in to save articles
            </div>
          )}
        </>
      )}

      {onSavedArticlesPage && (
        <>
          <button className='news-card__button news-card__button_delete'></button>
          <div className='news-card__tag news-card__tag_type_tooltip'>
            Remove from saved
          </div>
          <div className='news-card__tag news-card__tag_type_keyword'>
            Keyword
          </div>
        </>
      )}

      <div className='news-card__details'>
        <p className='news-card__date'>{data.date}</p>
        <h2 className='news-card__title'>{data.title}</h2>
        <p className='news-card__description'>{data.description}</p>
        <p className='news-card__source'>{data.source}</p>
      </div>
    </div>
  );
}

export default NewsCard;
