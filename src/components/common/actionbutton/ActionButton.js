import './ActionButton.scss';
import React from 'react';

export default ({children, className, ...props}) =>
    <button className={`btn semibold action-button text-center ${className || ""}`} {...props}>
        {children}
    </button>
