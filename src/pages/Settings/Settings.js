import React, { useState } from 'react'

const Settings = () => {
  const [message, setMessage] = useState('');

  const handleChange = event => {
    setMessage(event.target.value);
  };

  const handleClick = () => {
    // 👇️ clear input value
    setMessage('');
  };
  return (
    <div>
      <input
        id="message"
        name="message"
        type="text"
        onChange={handleChange}
        value={message}
      />

      <button onClick={handleClick}>Clear field</button>
    </div>
  )
}

export default Settings