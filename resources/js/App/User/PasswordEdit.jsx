import React, {useState, useEffect} from 'react';

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
              <form action="" onSubmit={handleChangePasswordSubmit}>
                <p>change password</p>
                  <input type="password" id="password" name="password" placeholder="old password" onChange={handleTextValueChange}/><br/> 
                  <span className="error-message">{errors.password}</span><br/>

                  <input type="password" id="newPassword" name="newPassword" placeholder="new password" onChange={handleTextValueChange}/><br/> 
                  <span className="error-message">{errors.newPassword}</span><br/>

                  <input type="password" id="confirmNewPassword" name="newPassword_confirmation" placeholder="confirm new password" onChange={handleTextValueChange}/><br/>

                  <input type="submit" value="Change password"/> 
                  <p className="complete-message">{status}</p>
              </form>
          </>
        )
}

export default PasswordEdit