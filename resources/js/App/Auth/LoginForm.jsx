import React, { useState, useEffect } from 'react';

const LoginForm = () =>  {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [data, setData] = useState();

        
    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
    fetch('/login', {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    })
    .then (response => response.json())
    .then(data => setData(data));
    }

    
  
    let errors = data ? data.errors : "";

    if (data) {
      if (data.logged) {
        location.replace(data.intended);
      }
    }
    
    
    return (
        <>
        <div className="login-form">
          <h3 className="auth-h3">Login Form</h3>
          <form action="" onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="email" className="auth-label">Email</label><br/>
              <input type="email" id="email" className="form-control" placeholder="example@example.com" name="email" value={email} onChange={handleEmailChange}/><br/>
              <span className="error-message">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="auth-label">Password</label><br/>
              <input type="password" id="password" className="form-control" name="password" placeholder="password" value={password} onChange={handlePasswordChange}/><br/>
              <span className="error-message">{errors.password}</span>
            </div>

            <div className="auth-submit">
              <input type="submit" className="btn-sign-up" value="Login"/>
            </div>

            <div className="auth-link-register">
              <a href="/register">Don't have an account? Register here</a>
            </div>
          </form>
        </div>
            
        </>
      )
}

export default LoginForm