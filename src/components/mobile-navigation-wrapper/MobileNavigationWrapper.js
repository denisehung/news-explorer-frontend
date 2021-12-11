import React from 'react';

function MobileNavigationWrapper(props) {
  if (props.mobileWidth) {
    return <div className="header__navigation-container">{props.children}</div>;
  }
  return props.children;
}

export default MobileNavigationWrapper;
