import React from 'react';

export default ({children, columnTitle ,className}) => {
    return (<div className={`${className || ''}`}>
        <p>{columnTitle}</p>
        {children}
    </div>);
}
