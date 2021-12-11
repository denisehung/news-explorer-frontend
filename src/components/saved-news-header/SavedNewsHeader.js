import React, { useEffect, useState } from 'react';
import './SavedNewsHeader.css';

function SavedNewsHeader({ currentUser, savedArticles }) {
  const [keywordArray, setKeyWordArray] = useState([]);

  useEffect(() => {
    // grab keywords from article objects
    const allKeywordsArray = savedArticles.map((value) => value.keyword);

    // capitalize first letter of each keyword
    allKeywordsArray.map(
      (keyword) => keyword.charAt(0).toUpperCase() + keyword.substr(1)
    );

    // count the occurrence of each keyword in the array
    var countKeywords = allKeywordsArray.reduce(function (keyword, value) {
      keyword[value] = (keyword[value] || 0) + 1;
      return keyword;
    }, {});

    // sort keywords by occurence
    var sortedArray = Object.keys(countKeywords).sort(function (a, b) {
      return countKeywords[b] - countKeywords[a];
    });
    setKeyWordArray(sortedArray);
  }, [savedArticles]);

  return (
    <section className="saved">
      <div className="saved__content">
        <p className="saved__title">Saved articles</p>
        <h1 className="saved__heading">
          {currentUser.name}, you have {savedArticles.length} saved articles
        </h1>
        <p className="saved__keywords">
          By keywords:{' '}
          <span className="saved__keywords-bold">
            {keywordArray.length > 3
              ? `${keywordArray[0]}, ${keywordArray[1]}, and ${
                  keywordArray.length - 2
                } others`
              : keywordArray.join(', ')}
          </span>
        </p>
      </div>
    </section>
  );
}

export default SavedNewsHeader;
