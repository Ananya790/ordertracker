import React, { useState, useEffect } from 'react';
import './App.css';
import Cookies from 'js-cookie';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');

  useEffect(() => {
    generateCaptcha();
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captchaString = '';
    for (let i = 0; i < 6; i++) {
      captchaString += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptcha(captchaString);
  };

  const UsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const PasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const CaptchaInputChange = (event) => {
    setCaptchaInput(event.target.value);
  };

  const onClickSubmit = (event) => {
    event.preventDefault();
    console.log(`Username: ${username}, Password: ${password}, CAPTCHA Input: ${captchaInput}, CAPTCHA: ${captcha}`);
    
    if (captchaInput !== captcha) {
      alert('CAPTCHA is incorrect');
      generateCaptcha();  // Generate a new CAPTCHA if the entered one is incorrect
      return;
    }

    if (username === 'ananya' && password === '1234') {
      Cookies.set('cookieconstant', username, { path: '/' });
      window.location = 'http://localhost:3000/Home';
    } else {
      alert('Invalid username or password');
    }
  };

  return (

    <div className="container box">
      <h1 className="heading">ORDER<br/> TRACKER</h1>
      <form onSubmit={onClickSubmit}>
        
        <p className='label'>Username:</p>
        <input type="text" value={username} onChange={UsernameChange} placeholder="Enter name" />
        <br />
        <p className='label'>Password:</p>
        <input type="password" value={password} onChange={PasswordChange} placeholder="Enter ADIO password" />
        <br />
        <p className='label'>CAPTCHA:</p>
        <div className='captcha'>{captcha}</div>
        <input type="text" value={captchaInput} onChange={CaptchaInputChange} placeholder="Enter CAPTCHA" />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
