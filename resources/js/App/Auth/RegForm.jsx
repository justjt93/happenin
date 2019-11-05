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
      .then(response => response.json())
      .then(data => this.setState ({
        response: data
      }));
      
      
      // .then(data => {
      //     if (data.status === 'success') {
      //         this.props.onLoginSuccess(data.data.token);
      //     }
      // })
    }
  
  render() {
    let errors = this.state.response ? this.state.response.errors : "";
    
    return (
        <>
        <div className="register-form">
          <h3>Registration Form</h3>
          <form action="" onSubmit={this.handleSubmit}>

            <div className="form-group">
              <input type="text" className="form-control" placeholder="Your name" name="name" value={this.state.name} onChange={this.handleNameChange}/>
              <span className="error-message">{errors.name}</span>
            </div>

            <div className="form-group">
              <input type="email" className="form-control" placeholder="Email" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
              <span className="error-message">{errors.email}</span>
            </div>

            <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" name="password" value={this.state.password} onChange={this.handlePasswordChange}/>
              <span className="error-message">{errors.password}</span>
            </div>

            <div className="form-group">
              <input type="password" className="form-control" placeholder="Re-type password" name="password_confirmation" value={this.state.password_confirmation} onChange={this.handleReTypePasswordChange}/>
            </div>
              
            <input type="submit" className="btn-sign-up" value="submit"/>
          </form>
        </div>
            
        </>
      )
  }
}