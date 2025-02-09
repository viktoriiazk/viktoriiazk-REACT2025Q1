import React from 'react';

const ErrorTrigger: React.FC = () => {
  const triggerError = () => {
    throw new Error('Error! Something went wrong.');
  };

  return (
    <div>
      <button onClick={triggerError}>Trigger Error</button>
    </div>
  );
};

export default ErrorTrigger;
