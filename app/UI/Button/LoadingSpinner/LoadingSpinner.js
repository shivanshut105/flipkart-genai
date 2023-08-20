import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = props => {
  return (
    <div className="flex items-center justify-center">
        <div className={`${props.asOverlay && 'loading-spinner__overlay'} mt-10`}>
          <div className="lds-dual-ring"></div>
        </div>
    </div>
  );
};

export default LoadingSpinner;