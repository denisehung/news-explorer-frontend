import React from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({ currentUser, savedArticleData }) {
  
  // grab keywords from article objects
  const allKeywordsArray = savedArticleData.map((value) => value.keyword);

  //capitalize first letter, and create a Set of one of each keyword
  const keywordArray = [
    ...new Set(
      allKeywordsArray.map(
        (keyword) => keyword.charAt(0).toUpperCase() + keyword.substr(1)
      )
    ),
  ];

  return (
    <section className='saved'>
      <div className='saved__content'>
        <p className='saved__title'>Saved articles</p>
        <h1 className='saved__heading'>
          {currentUser?.name}, you have {savedArticleData.length} saved articles
        </h1>
        <p className='saved__keywords'>
          By keywords:{' '}
          <span className='saved__keywords-bold'>
            {`${keywordArray[0]}, ${keywordArray[1]}, and ${
              keywordArray.length - 2
            } others`}
          </span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
