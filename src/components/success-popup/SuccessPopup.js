import React from 'react';
import PopupWithForm from '../popup-with-form/PopupWithForm';

function SuccessPopup(props) {
  return (
    <PopupWithForm
      name="success"
      title="Registration successfully completed!"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isLoading={props.isLoading}
    >
      <p className="popup__signin-link" onClick={props.onSignInClick}>
        Sign in
      </p>
    </PopupWithForm>
  );
}

export default SuccessPopup;
