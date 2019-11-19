import React, { useState } from 'react';

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

    
  
    let errors = data ? data.errors ? data.errors : "" : "";

    if (data) {
      if (data.logged) {
        location.replace(data.intended);
      }
    }
    
    
    return (
        <>
        <div className="login-form">

          <div className="heading-form">
            <h3 className="auth-h3">Login Form</h3>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="auth-inputs">
            <div className="form-group">
              <label htmlFor="email" className="auth-label">Email:</label><br/>
              <input type="email" id="email" className="form-control" placeholder="example@example.com" name="email" value={email} onChange={handleEmailChange}/><br/>
              <span className="error-message">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="auth-label">Password:</label><br/>
              <input type="password" id="password" className="form-control" name="password" placeholder="password" value={password} onChange={handlePasswordChange}/><br/>
              <span className="error-message">{errors.password}</span>
            </div>
            </div>
            <div className="auth-submit">
              <input type="submit" className="btn-sign-up" value="Login"/>
            </div>
          </form>

          <div className="auth-or">
            <h3><span>OR</span></h3>
          </div>
          
          <div className="social-group">

            <label htmlFor="socialMedia">Sign in with Social Networks</label>

            <div className="buttons-social">
              <a href='login/facebook' class="loginBtn loginBtn--facebook">Login with Facebook</a>
              <a href='login/google' class="loginBtn loginBtn--google">Login with Google</a>
            </div>

          </div>

          <div className="auth-link-register">
              <p>Don't have an account? <a href="/register">Register here!</a> </p>
              
          </div>

        </div>
            
        </>
      )
}

export default LoginForm