import React from 'react';
import './NoResults.css';
import NoResultsImage from '../../images/no-results-image.svg';

function NoResults() {
  return (
    <section className='no-results'>
      <div className='no-results__container'>
        <img
          className='no-results__image'
          src={NoResultsImage}
          alt='sad magnifying glass'
        />
        <h3 className='no-results__title'>Nothing found</h3>
        <p className='no-results__description'>
          Sorry, but nothing matched your search terms
        </p>
      </div>
    </section>
  );
}

export default NoResults;
