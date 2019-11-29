import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

 const PasswordEdit = () => {
    const [formInputValues, setFormInputValues] = useState({password: null, newPassword: null, confirmNewPassword: null, id: null});
    const [data, setData] = useState();

    useEffect(() => {
        const user = (JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')));

        setFormInputValues({
            ...formInputValues,
            id: user.id
        })
    }, []);

    const handleTextValueChange = e => {
    setFormInputValues({
        ...formInputValues,
        [e.target.id]: e.target.value
    })
    };

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
          <div className="popup-container">
          
          <div className="popup-window edit-info pswd">
              <div className="popup-top-stripe">Change your password</div>
              <form action="" onSubmit={handleChangePasswordSubmit}>
                <div className="popup-text edit-profile pswd">
                  <input type="password" id="password" name="password" placeholder="old password" onChange={handleTextValueChange}/><br/> 
                  <span className="error-message">{errors.password}</span><br/>

                  <input type="password" id="newPassword" name="newPassword" placeholder="new password" onChange={handleTextValueChange}/><br/> 
                  <span className="error-message">{errors.newPassword}</span><br/>

                  <input type="password" id="confirmNewPassword" name="newPassword_confirmation" placeholder="confirm new password" onChange={handleTextValueChange}/><br/>
                </div>

                <div className="popup-btns">
                    <input type="submit" className="btn btn-success submit-green" value="Change"/>
                  <Link to="/userdetail/"><div className="go-back btn btn-red">Cancel</div></Link>   
                </div>


              </form>
            </div>
            </div>
          </>
        )
}

export default PasswordEdit