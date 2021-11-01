import React from "react";
import './PopupWithForm.css';

function PopupWithForm(props) {

  function handlePopupClick(e) {
    if (e.target.classList.contains('popup_open')) {
      props.onClose();
    }
  }

  return(
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_open' : '' }`} onClick={handlePopupClick}>
      <div className="popup__wrapper">
        <button className="popup__close-button popup__close-button_type_form" type="button"
          aria-label="Close popup" onClick={props.onClose}></button>
        <div className="popup__form-container">
          <h2 className="popup__title">{props.title}</h2>
          <form className={`popup__form popup__form_type_${props.name}`} name={`form-${props.name}`} onSubmit={props.onSubmit}>

            <div className="popup__input-wrapper">
              <label className="popup__input-label" htmlFor="email-input">Email</label>
              <input type="email" className="popup__input" id={`email-input-${props.name}`} autoComplete="off" placeholder="Enter email" name="email" required />
              <p id="email-input-error" className="popup__error"></p>
            </div>

            <div className="popup__input-wrapper">
              <label className="popup__input-label" htmlFor="password-input">Password</label>
              <input type="password" className="popup__input" id={`password-input-${props.name}`} autoComplete="off" placeholder="Enter password" name="password" required />
              <p id="password-input-error" className="popup__error"></p>
            </div>

            {props.children}
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default PopupWithForm;