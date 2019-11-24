import React, { useState} from 'react';

const RegForm = () => {
    const [name, setName] = useState(window.__username ? window.__username : '');
    const [email, setEmail] = useState(window.__useremail ? window.__useremail : '');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [data, setData] = useState();
    const [submitting, setSubmitting] = useState(false);


    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleReTypePasswordChange = (event) => {
        setPasswordConfirmation(event.target.value)
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      if(submitting){
        return false;
      }else{
        setSubmitting(true);
      }
      console.log(document.querySelector('meta[name="csrf-token"]').getAttribute('content'))
      fetch('/register', {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            name: name,
            email: email,
            avatar: window.__avatar,
            password: password,
            password_confirmation: passwordConfirmation
        })
      })
      .then (response => response.json())
      .then(data => {
        setData(data)
        setSubmitting(false)})
    }
  
    let errors = data ? data.errors : "";

    if (data) {
      if (data.registered) {
        location.replace("../");
      }
    }
    
    
    return (
        <>
        <div className="register-form">

          <div className="heading-form">
            <h3 className="auth-h3">Registration Form</h3>
          </div>

          <form action="" onSubmit={handleSubmit}>

            <div className="auth-inputs">
            <div className="form-group">
              <label htmlFor="name" className="auth-label">Username:</label><br/>
              <input type="text" className="form-control" name="name" id="name" placeholder="your username" value={name} onChange={handleNameChange}/><br/>
              <span className="error-message">{errors.name}</span>
            </div>

            <div className="form-group">
            <label htmlFor="email" className="auth-label">Email:</label><br/>
              <input type="text" id="email" className="form-control" placeholder="example@example.com" name="email" value={email} onChange={handleEmailChange}/><br/>    
              <span className="error-message">{errors.email}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="auth-label">Password:</label><br/>
              <input type="password" className="form-control" id="password" placeholder="password" name="password" value={password} onChange={handlePasswordChange}/><br/>
              <span className="error-message">{errors.password}</span>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="auth-label">Confirm Password:</label><br/>
              <input type="password" className="form-control" placeholder="re-type password" name="password_confirmation" value={passwordConfirmation} onChange={handleReTypePasswordChange}/>
            </div>
            </div>

            <div className="auth-submit">
              <input type="submit" className="btn-sign-up" value="Create account"/>
            </div>
          </form>

          <div className="auth-or">
            <h3><span>OR</span></h3>
          </div>

          <div className="social-group">

            <label htmlFor="socialMedia">Sign in with Social Networks</label>

            <div className="buttons-social">
              <a href='login/facebook' className="loginBtn loginBtn--facebook">Login with Facebook</a>
              <a href='login/google' className="loginBtn loginBtn--google">Login with Google</a>
            </div>

          </div>

        </div> 
            
        </>
      )
}

export default RegForm