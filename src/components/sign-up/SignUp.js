import React, { useEffect } from 'react';
import PopupWithForm from '../popup-with-form/PopupWithForm';
import FormValidator from '../../utils/formValidator';

function SignUp({ 
  isOpen, 
  onClose,  
  onRegisterSubmit,
  onSignInClick,
  name,
}) {

  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm,
  } = FormValidator();

  useEffect(() => {
    resetForm();
  }, [isOpen, resetForm]);

  function handleSubmit(e) {
    e.preventDefault();
    onRegisterSubmit();
  } 

  return(
    <PopupWithForm name="sign-up" title="Sign up" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="email-input">Email</label>
        <input type="email" className="popup__input" id="email-register" autoComplete="off" placeholder="Enter email" name="email" value={values.email || ''} onChange={handleChange} required />
        <p id="email-input-error" className="popup__error">{errors.email || ''}</p>
      </div>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="password-input">Password</label>
        <input type="password" className="popup__input" id={`password-input-${name}`} autoComplete="on" placeholder="Enter password" name="password" onChange={handleChange} value={values.password || ''} minLength ="5" maxLength="30" required />
        <p id="password-input-error" className="popup__error">{errors.password}</p>
      </div>

      <div className="popup__input-wrapper">
        <label className="popup__input-label" htmlFor="username-input">Username</label>
        <input type="username" className="popup__input" id="username-input" autoComplete="on" placeholder="Enter username" name="username" value={values.username || ''} onChange={handleChange} required />
        <p id="password-input-error" className="popup__error">{errors.username}</p>
      </div>

        <button className={`popup__submit-button ${isValid ? "popup__submit-button_active" : ""}`} type="submit" aria-label="Sign up" disabled={!isValid}>Sign up</button>
        <p className='popup__signin-signup'>or <span className='popup__link' onClick={onSignInClick}>Sign in</span></p>
    </PopupWithForm>
  );
}

export default SignUp;