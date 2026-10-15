import React from 'react';

const FeedbackState = ({ type = 'loading', message, onRetry }) => {
  if (type === 'loading') {
    return (
      <div className="feedback-state loading">
        <div className="spinner"></div>
        <p>{message || 'Loading data, please wait...'}</p>
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="feedback-state error">
        <p className="error-message">⚠️ {message || 'Something went wrong.'}</p>
        {onRetry && (
          <button type="button" className="retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    );
  }

  if (type === 'empty') {
    return (
      <div className="feedback-state empty">
        <p>{message || 'No records found.'}</p>
      </div>
    );
  }

  return null;
};

export default FeedbackState;