import React from 'react';

const Button = ({ className, callback }) => (
  <div className="button">
    <i className={className} onClick={callback} />
  </div>
);
export default Button;
