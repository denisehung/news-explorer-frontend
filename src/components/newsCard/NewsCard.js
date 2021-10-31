import React from 'react';
import './NewsCard.css';
import newsDog from '../../images/news-dog.jpg';

function NewsCard() {
  return (
    <div className="news-card">
      <img src={newsDog} alt="card title" className="news-card__image" />
      <button className="news-card__button news-card__button_save"></button>
      <div className="news-card__details">
        <p className="news-card__date">November 4, 2020</p>
        <h2 className="news-card__title">Everyone Needs a Special 'Sit Spot' in Nature</h2>
        <p className="news-card__description">Ever since I read Richard Louv's influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find another thing</p>
        <p className="news-card__source">Treehugger</p>
      </div>
    </div>
  )
}

export default NewsCard;