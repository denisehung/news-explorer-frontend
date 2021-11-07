import React from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';

function SignIn({ 
    isOpen, 
    onClose, 
    isLoading, 
    onLogInSubmit,
    onSignUpClick,
    handleChange,
    errors,
    isValid,
    name
  }) {

  function handleSubmit(e) {
    e.preventDefault();
    onLogInSubmit();
  } 

  return(
    <PopupWithForm name="sign-in" title="Sign in" isOpen={isOpen} onClose={onClose} isLoading={isLoading} onSubmit={handleSubmit}>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="email-input">Email</label>
        <input type="email" className="popup__input" id={`email-input-${name}`} autoComplete="off" placeholder="Enter email" name="email" onChange={handleChange} required />
        <p id="email-input-error" className="popup__error">{errors.email}</p>
      </div>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="password-input">Password</label>
        <input type="password" className="popup__input" id={`password-input-${name}`} autoComplete="off" placeholder="Enter password" name="password" onChange={handleChange} minLength="5" required />
        <p id="password-input-error" className="popup__error">{errors.password}</p>
      </div>

      <button className={`popup__submit-button ${isValid ? "popup__submit-button_active" : ""}`} type="submit" aria-label="Sign in" disabled={!isValid}>Sign in</button>
      <p className='popup__signin-signup'>or <span className='popup__link' onClick={onSignUpClick}>Sign up</span></p>
    </PopupWithForm>
  );
  }

export default SignIn;