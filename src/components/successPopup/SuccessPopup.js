import React from "react";
import PopupWithForm from '../popupWithForm/PopupWithForm';

function SuccessPopup(props) {
  return(
    <PopupWithForm name="success" title="Registration successfully completed!" isOpen={props.isOpen} onClose={props.onClose} isLoading={props.isLoading}>
      <p className='popup__signin-link'>Sign in</p>
    </PopupWithForm>
  );
  }

export default SuccessPopup;