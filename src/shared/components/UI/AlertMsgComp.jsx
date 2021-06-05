import React from 'react';

const AlertComp = ({ msg, type }) => {
  let bgColor = 'alert-success';
  if (type === 'error') bgColor = 'alert-error';
  else if (type === 'warning') bgColor = 'alert-warning';
  return (
    <div className={`alert ${bgColor} alert-intro`} style={{ textAlign: 'center' }} role="alert">
      { msg }
    </div>
  );
};

export default AlertComp;
