import React from "react";
import PopupWithForm from '../popupWithForm/PopupWithForm';

function SignIn(props) {

  return(
    <PopupWithForm name="sign-in" title="Sign in" isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading}>

      <button className="popup__submit-button" type="submit" aria-label="Sign in">Sign in</button>
      <p className='popup__signin-signup'>or <span className='popup__link' onClick={props.onSignUpClick}>Sign up</span></p>
    </PopupWithForm>
  );
  }

export default SignIn;