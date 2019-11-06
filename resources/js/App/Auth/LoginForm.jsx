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
      // .then(data => {
      //     if (data.status === 'success') {
      //         this.props.onLoginSuccess(data.data.token);
      //     }
      // })
    }

    handleRedirect = () => {
      location.replace("../");
    }
  
  render() {
    let errors = this.state.response ? this.state.response.errors : "";

    if (this.state.response) {
      if (this.state.response.status === "success") {
        location.replace("../");
      }
    }
    
    
    return (
        <>
        <div className="register-form">
          <h3>Login Form</h3>
          <form action="" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
              <span className="error-message">{errors.email}</span>
            </div>

            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
              <span className="error-message">{errors.password}</span>
            </div>

            <input type="submit" className="btn-sign-up" value="submit"/>
            <a href="/register">Don't have an account? Register here</a>
          </form>
        </div>
            
        </>
      )
  }
}