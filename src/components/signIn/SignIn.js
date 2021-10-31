import React from "react";
import PopupWithForm from '../popupWithForm/PopupWithForm';

function SignIn(props) {
  return(
    <PopupWithForm name="sign-in" title="Sign in" isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading}>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" for="email-input">Email</label>
        <input type="email" className="popup__input" id="email-input" autoComplete="off" placeholder="Enter email" name="email" required />
        <p id="email-input-error" className="popup__error"></p>
      </div>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" for="password-input">Password</label>
        <input type="password" className="popup__input" id="password-input" autoComplete="off" placeholder="Enter password" name="password" required />
        <p id="password-input-error" className="popup__error"></p>
      </div>

      <button className="popup__submit-button" type="submit" aria-label="Sign in">Sign in</button>
      <p className='popup__signin-signup'>or <span className='popup__link' onClick={props.onSignUpClick}>Sign up</span></p>
    </PopupWithForm>
  );
  }

export default SignIn;