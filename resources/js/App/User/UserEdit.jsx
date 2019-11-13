import React, {useState, useEffect} from 'react';
import Menu from "../Components/Menu.jsx";
import Footer from "../Components/Footer.jsx";

 const UserEdit = () => {
    const [name, setName] = useState('Loading..'); 
    const [email, setEmail] = useState('Loading..');
    const [password, setPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmNewPassword, setConfirmNewPassword] = useState();
    const [id, setId] = useState();
    const [data, setData] = useState();

    useEffect(() => {
        const user = (JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')));

        setName(user.name)
        setEmail(user.email)
        setId(user.id)
      }, []);

    const handleNameChange = (event) => {
        setName(event.target.value)
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value)
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value)
    }

    const handleNewPasswordChange = (event) => {
        setNewPassword(event.target.value)
    }

    const handleConfirmNewPasswordChange = (event) => {
        setConfirmNewPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        fetch(`/userdetail/edit/${id}`, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            newPassword: newPassword,
            newPassword_confirmation: confirmNewPassword,
        })
        })
        .then (response => response.json())
        .then(data => setData(data))
    }

    const handleChangePasswordSubmit = (event) => {
        event.preventDefault();
        
        fetch(`/userdetail/passwordchange/${id}`, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            password: password,
            newPassword: newPassword,
            newPassword_confirmation: confirmNewPassword,
        })
        })
        .then (response => response.json())
        .then(data => setData(data))
    }
    
    let errors = data ? data.errors ? data.errors: "" : "";
    let status = data ? data.status ? data.status: "" : "";


      return (
          <>
            <div className="user-detail">
              <Menu />
              <div className="user-item">
              <p>change user information</p><br/>
              <p className="complete-message">{status}</p>
              <form action="" onSubmit={handleSubmit}>
                <label htmlFor="name">name</label>
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange}/><br/> 
                <span className="error-message">{errors.name}</span><br/>

                <label htmlFor="email">email</label>
                <input type="text" id="email" name="email" value={email} onChange={handleEmailChange}/><br/> 
                <span className="error-message">{errors.email}</span><br/>

                <input type="submit" value="Submit changes"/>
              </form>

              <form action="" onSubmit={handleChangePasswordSubmit}>
                <p>change password</p>
                  <input type="password" id="password" name="password" placeholder="old password" onChange={handlePasswordChange}/><br/> 
                  <span className="error-message">{errors.password}</span><br/>

                  <input type="password" id="newPassword" name="newPassword" placeholder="new password" onChange={handleNewPasswordChange}/><br/> 
                  <span className="error-message">{errors.newPassword}</span><br/>

                  <input type="password" id="newPassword_confirmation" name="newPassword_confirmation" placeholder="confirm new password" onChange={handleConfirmNewPasswordChange}/><br/>

                  <input type="submit" value="Change password"/> 
              </form>
                </div>
              <Footer />
            </div>
          </>
        )
}

export default UserEdit