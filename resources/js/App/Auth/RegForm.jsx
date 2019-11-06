import React from 'react';

export default class RegForm extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
          name: "",
          email: "",
          password: "",
          password_confirmation: "",
      };
    }

    handleNameChange = (event) => {
      this.setState({
        name: event.target.value,
      })
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

    handleReTypePasswordChange = (event) => {
      this.setState({
        password_confirmation: event.target.value,
      })
    }

    handleSubmit = (event) => {
      event.preventDefault();
      
      fetch('/register', {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirmation: this.state.password_confirmation
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
          <h3 className="auth-h3">Register</h3>
          <form action="" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <label htmlFor="name" className="auth-label">Username</label><br/>
              <input type="text" className="form-control" name="name" id="name" placeholder="your username" value={this.state.name} onChange={this.handleNameChange}/><br/>
              <span className="error-message">{errors.name}</span>
            </div>

            <div className="form-group">
            <label htmlFor="email" className="auth-label">Email</label><br/>
              <input type="text" id="email" className="form-control" placeholder="example@example.com" name="email" value={this.state.email} onChange={this.handleEmailChange}/><br/>
              <span className="error-message">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="auth-label">Password</label><br/>
              <input type="password" className="form-control" id="password" placeholder="password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/><br/>
              <span className="error-message">{errors.password}</span>
            </div>

            <div className="form-group">
              <input type="password" className="form-control" placeholder="re-type password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleReTypePasswordChange}/>
            </div>
            
            <div className="auth-submit">
              <input type="submit" className="btn-sign-up" value="Create account"/>
            </div>
          </form>
        </div>
            
        </>
      )
  }
}