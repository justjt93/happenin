import React, {useState, useEffect} from 'react';
import Menu from "../Components/Menu.jsx";
import Footer from "../Components/Footer.jsx";

 const UserEdit = () => {
    const [formInputValues, setFormInputValues] = useState({ name: 'Loading..', email: 'Loading..', password: null, newPassword: null, confirmNewPassword: null, id: null});
    const [data, setData] = useState();

    useEffect(() => {
        const user = (JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')));

        setFormInputValues({
            ...formInputValues,
            name: user.name,
            email: user.email,
            id: user.id
        })
      }, []);

      const handleTextValueChange = e => {
        setFormInputValues({
          ...formInputValues,
          [e.target.id]: e.target.value
        })
      };

    const handleSubmit = (event) => {
        event.preventDefault();
        
        fetch(`/userdetail/edit/${formInputValues.id}`, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            name: formInputValues.name,
            email: formInputValues.email,
        })
        })
        .then (response => response.json())
        .then(data => setData(data))
    }

    const handleChangePasswordSubmit = (event) => {
        event.preventDefault();
        
        fetch(`/userdetail/passwordchange/${formInputValues.id}`, {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            password: formInputValues.password,
            newPassword: formInputValues.newPassword,
            newPassword_confirmation: formInputValues.confirmNewPassword,
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
                <input type="text" id="name" name="name" value={formInputValues.name} onChange={handleTextValueChange}/><br/> 
                <span className="error-message">{errors.name}</span><br/>

                <label htmlFor="email">email</label>
                <input type="text" id="email" name="email" value={formInputValues.email} onChange={handleTextValueChange}/><br/> 
                <span className="error-message">{errors.email}</span><br/>

                <input type="submit" value="Submit changes"/>
              </form>

              <form action="" onSubmit={handleChangePasswordSubmit}>
                <p>change password</p>
                  <input type="password" id="password" name="password" placeholder="old password" onChange={handleTextValueChange}/><br/> 
                  <span className="error-message">{errors.password}</span><br/>

                  <input type="password" id="newPassword" name="newPassword" placeholder="new password" onChange={handleTextValueChange}/><br/> 
                  <span className="error-message">{errors.newPassword}</span><br/>

                  <input type="password" id="confirmNewPassword" name="newPassword_confirmation" placeholder="confirm new password" onChange={handleTextValueChange}/><br/>

                  <input type="submit" value="Change password"/> 
              </form>
                </div>
              <Footer />
            </div>
          </>
        )
}

export default UserEdit