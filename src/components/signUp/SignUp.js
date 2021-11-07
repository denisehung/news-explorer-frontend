import React from 'react';
import PopupWithForm from '../popupWithForm/PopupWithForm';

function SignUp({ 
  isOpen, 
  onClose, 
  isLoading, 
  onRegisterSubmit,
  onSignInClick,
  handleChange,
  errors,
  isValid,
  name
}) {

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterSubmit();
  } 

  return(
    <PopupWithForm name="sign-up" title="Sign up" isOpen={isOpen} onClose={onClose} isLoading={isLoading} onSubmit={handleSubmit}>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="email-input">Email</label>
        <input type="email" className="popup__input" id={`email-input-${name}`} autoComplete="off" placeholder="Enter email" name="email" onChange={handleChange} required />
        <p id="email-input-error" className="popup__error">{errors.email}</p>
      </div>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="password-input">Password</label>
        <input type="password" className="popup__input" id={`password-input-${name}`} autoComplete="off" placeholder="Enter password" name="password" onChange={handleChange} minLength ="5" required />
        <p id="password-input-error" className="popup__error">{errors.password}</p>
      </div>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="username-input">Username</label>
        <input type="username" className="popup__input" id="username-input" autoComplete="off" placeholder="Enter username" name="username" onChange={handleChange} required />
        <p id="password-input-error" className="popup__error">{errors.username}</p>
      </div>

        <button className={`popup__submit-button ${isValid ? "popup__submit-button_active" : ""}`} type="submit" aria-label="Sign up" disabled={!isValid}>Sign up</button>
        <p className='popup__signin-signup'>or <span className='popup__link' onClick={onSignInClick}>Sign in</span></p>
    </PopupWithForm>
  );
}

export default SignUp;