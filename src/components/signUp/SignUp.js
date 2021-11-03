import React, { useState } from "react";
import PopupWithForm from '../popupWithForm/PopupWithForm';

function SignUp(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  function handleEmail(e) {
    let emailValue = e.currentTarget.value;
    setEmail(emailValue);
  }

  function handlePassword(e) {
    let passwordValue = e.currentTarget.value;
    setPassword(passwordValue);
  }

  function handleName(e) {
    let nameValue = e.currentTarget.value;
    setName(nameValue);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegisterSubmit();
    setEmail('');
    setPassword('');
    setName('');
  } 

  return(
    <PopupWithForm name="sign-up" title="Sign up" isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading} onSubmit={handleSubmit}>

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

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="username-input">Username</label>
        <input type="username" className="popup__input" id="username-input" autoComplete="off" placeholder="Enter username" name="username" value={name}  onChange={handleName} required />
        <p id="password-input-error" className="popup__error"></p>
      </div>

        <button className="popup__submit-button" type="submit" aria-label="Sign in">Sign up</button>
        <p className='popup__signin-signup'>or <span className='popup__link' onClick={props.onSignInClick}>Sign in</span></p>
    </PopupWithForm>
  );
}

export default SignUp;