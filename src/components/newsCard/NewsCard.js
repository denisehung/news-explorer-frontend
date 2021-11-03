import React from 'react';
import './NewsCard.css';

function NewsCard({data}) {
  return (
    <div className="news-card">
      <img src={data.image} alt={data.alt} className="news-card__image" />
      <button className="news-card__button news-card__button_save"></button>
      <div className="news-card__details">
        <p className="news-card__date">{data.date}</p>
        <h2 className="news-card__title">{data.title}</h2>
        <p className="news-card__description">{data.description}</p>
        <p className="news-card__source">{data.source}</p>
      </div>
    </div>
  )
}

export default NewsCard;