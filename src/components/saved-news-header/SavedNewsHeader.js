import React from 'react';
import './SavedNewsHeader.css';
import cardsArray from '../../arrays/cardsArray';

function SavedNewsHeader() {
  return (
    <section className='saved'>
      <div className='saved__content'>
        <p className='saved__title'>Saved articles</p>
        <h1 className='saved__heading'>
          Colin, you have {cardsArray.length} saved articles
        </h1>
        <p className='saved__keywords'>
          By keywords:{' '}
          <span className='saved__keywords-bold'>
            Nature, Yellowstone, and 2 other
          </span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
