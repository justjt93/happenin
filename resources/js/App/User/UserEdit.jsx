import React from 'react';
import Menu from "../Components/Menu.jsx";
import Footer from "../Components/Footer.jsx";

export default class UserEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: "loading..",
        email: "loading..",
        password: null,
        newPassword: null,
        confirmNewPassword: null,
        id: null
    };
  }

  componentDidMount() {
    const user = (JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')));

    this.setState({
      name: user.name,
      email: user.email,
      id: user.id
    })
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value
    })
  }

  handleEmailChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  handlePasswordChange = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  handleNewPasswordChange = (event) => {
    this.setState({
      newPassword: event.target.value
    })
  }

  handleConfirmNewPasswordChange = (event) => {
    this.setState({
      confirmNewPassword: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`/userdetail/edit/${this.state.id}`, {
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
          newPassword: this.state.newPassword,
          newPassword_confirmation: this.state.confirmNewPassword,
      })
    })
    .then (response => response.json())
    .then(data => this.setState ({
      response: data
    }));
  }

  handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    
    fetch(`/userdetail/passwordchange/${this.state.id}`, {
      method: 'POST',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({
          password: this.state.password,
          newPassword: this.state.newPassword,
          newPassword_confirmation: this.state.confirmNewPassword,
      })
    })
    .then (response => response.json())
    .then(data => this.setState ({
      response: data
    }));
  }
    
    render() {
      let errors = this.state.response ? this.state.response.errors ? this.state.response.errors: "" : "";
      let status = this.state.response ? this.state.response.status ? this.state.response.status: "" : "";


      return (
          <>
            <div className="user-detail">
              <Menu />
              <div className="user-item">
              <p>change user information</p><br/>
              <p className="complete-message">{status}</p>
              <form action="" onSubmit={this.handleSubmit}>
                <label htmlFor="name">name</label>
                <input type="text" id="name" name="name" value={this.state.name} onChange={this.handleNameChange}/><br/> 
                <span className="error-message">{errors.name}</span><br/>

                <label htmlFor="email">email</label>
                <input type="text" id="email" name="email" value={this.state.email} onChange={this.handleEmailChange}/><br/> 
                <span className="error-message">{errors.email}</span><br/>

                <input type="submit" value="Submit changes"/>
              </form>

              <form action="" onSubmit={this.handleChangePasswordSubmit}>
                <p>change password</p>
                  <input type="password" id="password" name="password" placeholder="old password" onChange={this.handlePasswordChange}/><br/> 
                  <span className="error-message">{errors.password}</span><br/>

                  <input type="password" id="newPassword" name="newPassword" placeholder="new password" onChange={this.handleNewPasswordChange}/><br/> 
                  <span className="error-message">{errors.newPassword}</span><br/>

                  <input type="password" id="newPassword_confirmation" name="newPassword_confirmation" placeholder="confirm new password" onChange={this.handleConfirmNewPasswordChange}/><br/>

                  <input type="submit" value="Change password"/> 
              </form>
                </div>
              <Footer />
            </div>
          </>
        )
    }
}