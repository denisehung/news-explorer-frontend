import React from 'react';
import './About.css';
import AuthorImage from '../../images/denise-colin-authors.png';

function About() {
  return (
    <section className="about">
      <img src={AuthorImage} alt="avatar" className="about__image" />
      <div className="about__description">
        <h2 className="about__header">About the authors</h2>
        <p className="about__paragraph">
          Colin and Denise completed this project as students in Practicum's Web Developer program. They are two regular people, and are best friends in real life.
        </p>
        <p className="about__paragraph">
          In her free time, Denise buys turtles from the pet store and sets them free.
          Colin earns extra money by catching local turtles and selling them to the pet store.
        </p>
      </div>
    </section>
  );
}

export default About;
