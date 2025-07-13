import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      onLogin(formData.email, formData.password);
    } else {
      onRegister(formData.email, formData.password, formData.name);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">Webalar Dashboard Login</h1>
          <p className="login-subtitle">Real-time collaborative task management</p>
        </div>
        
        <div className="login-tabs">
          <div className="tabs-container">
            <button
              type="button"
              onClick={() => setIsLoginMode(true)}
              className={`tab-button ${isLoginMode ? 'active' : ''}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setIsLoginMode(false)}
              className={`tab-button ${!isLoginMode ? 'active' : ''}`}
            >
              Register
            </button>
          </div>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {!isLoginMode && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="form-input"
              required
            />
          )}
          
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
          
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="form-input"
            required
          />
          
          <button type="submit" className="submit-button">
            {isLoginMode ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;