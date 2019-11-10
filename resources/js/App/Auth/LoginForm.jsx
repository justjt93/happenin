import React from 'react';

export default class LoginForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          email: "",
          password: "",
      };
    }

    handleEmailChange = (event) => {
      this.setState({
        email: event.target.value,
      })
    }

    handlePasswordChange = (event) => {
      this.setState({
        password: event.target.value,
      })
    }

    handleSubmit = (event) => {
      event.preventDefault();
      
      fetch('/login', {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
        })
      })
      .then (response => response.json())
      .then(data => this.setState ({
        response: data
      }));
    }

    handleRedirect = () => {
      location.replace("../");
    }
  
  render() {
    let errors = this.state.response ? this.state.response.errors : "";

    if (this.state.response) {
      if (this.state.response.logged) {
        location.replace(this.state.response.intended);
      }
    }
    
    
    return (
        <>
        <div className="login-form">
          <h3 className="auth-h3">Login Form</h3>
          <form action="" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="email" className="auth-label">Email</label><br/>
              <input type="email" id="email" className="form-control" placeholder="example@example.com" name="email" value={this.state.email} onChange={this.handleEmailChange}/><br/>
              <span className="error-message">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="auth-label">Password</label><br/>
              <input type="password" id="password" className="form-control" name="password" placeholder="password" value={this.state.password} onChange={this.handlePasswordChange}/><br/>
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
}