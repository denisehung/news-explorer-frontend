import React from 'react';
import Popup from '../popup/Popup';

function SuccessPopup(props) {
  return (
    <Popup
      name="success"
      title="Registration successfully completed!"
      isOpen={props.isOpen}
      onClose={props.onClose}
      isLoading={props.isLoading}
    >
      <p className="popup__signin-link" onClick={props.onSignInClick}>
        Sign in
      </p>
    </Popup>
  );
}

export default SuccessPopup;
