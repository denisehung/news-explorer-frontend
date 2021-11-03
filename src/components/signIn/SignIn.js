import React, { useState } from "react";
import PopupWithForm from '../popupWithForm/PopupWithForm';

function SignIn(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmail(e) {
    let emailValue = e.currentTarget.value;
    setEmail(emailValue);
  }

  function handlePassword(e) {
    let passwordValue = e.currentTarget.value;
    setPassword(passwordValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogInSubmit();
    setEmail('');
    setPassword('');
  } 

  return(
    <PopupWithForm name="sign-in" title="Sign in" isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading} onSubmit={handleSubmit}>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="email-input">Email</label>
        <input type="email" className="popup__input" id={`email-input-${props.name}`} autoComplete="off" placeholder="Enter email" name="email" value={email} onChange={handleEmail} required />
        <p id="email-input-error" className="popup__error"></p>
      </div>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="password-input">Password</label>
        <input type="password" className="popup__input" id={`password-input-${props.name}`} autoComplete="off" placeholder="Enter password" name="password" value={password} onChange={handlePassword} required />
        <p id="password-input-error" className="popup__error"></p>
      </div>

      <button className="popup__submit-button" type="submit" aria-label="Sign in">Sign in</button>
      <p className='popup__signin-signup'>or <span className='popup__link' onClick={props.onSignUpClick}>Sign up</span></p>
    </PopupWithForm>
  );
  }

export default SignIn;