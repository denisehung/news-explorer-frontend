import React from 'react';
import './About.css';
import AuthorImage from '../../images/author-image.jpg';

function About() {
  return (
    <section className="about">
      <img src={AuthorImage} alt="avatar" className="about__image" />
      <div className="about__description">
        <h2 className="about__header">About the authors</h2>
        <p className="about__paragraph">This block describes the project author. Here you should indicate your name, what you do, and which development technologies you know.</p>
        <p className="about__paragraph">You can also talk about your experience with Practicum, what you learned there, and how you can help potential customers.</p>
      </div>
    </section>
  )
}

export default About;