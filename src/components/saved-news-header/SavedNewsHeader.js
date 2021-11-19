import React, { useEffect, useState } from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({ currentUser, savedArticlesData }) {
  const [keywordArray, setKeyWordArray] = useState([]);

  useEffect(() => {
    // grab keywords from article objects
    const allKeywordsArray = savedArticlesData.map((value) => value.keyword);

    //capitalize first letter, and create a Set of one of each keyword
    setKeyWordArray([
      ...new Set(
        allKeywordsArray.map(
          (keyword) => keyword.charAt(0).toUpperCase() + keyword.substr(1)
        )
      ),
    ]);
  }, [savedArticlesData]);

  return (
    <section className='saved'>
      <div className='saved__content'>
        <p className='saved__title'>Saved articles</p>
        <h1 className='saved__heading'>
          {currentUser.name}, you have {savedArticlesData.length} saved articles
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
