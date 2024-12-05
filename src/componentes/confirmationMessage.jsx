import React from 'react';

const ConfirmationMessage = ({ message }) => {
  return message ? <p>{message}</p> : null;
};

export default ConfirmationMessage;
