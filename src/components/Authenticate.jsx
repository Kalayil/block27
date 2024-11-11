import React, { useState } from 'react';

function Authenticate({ token }) {
  const [authMessage, setAuthMessage] = useState('');
  const [error, setError] = useState(null);

  const handleAuthenticate = async () => {
    if (!token) {
      setError('No token available. Please sign up first.');
      return;
    }

    try {
      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setAuthMessage(data.message);
        setError(null);
      } else {
        setError(data.message || 'Authentication failed');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Authenticate</h2>
      {error && <p className="error-message">{error}</p>}
      {authMessage && <p className="success-message">{authMessage}</p>}
      <button onClick={handleAuthenticate}>Authenticate Token</button>
    </div>
  );
}

export default Authenticate;
