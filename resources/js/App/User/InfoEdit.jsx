import React, {useState, useEffect} from 'react';
//import { Link } from 'react-router-dom';

 const InfoEdit = (props) => {
    const [formInputValues, setFormInputValues] = useState({ name: 'Loading..', email: 'Loading..', id: null});
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
        .then((data) => {
          props.setUserData(formInputValues.name, formInputValues.email)
          setData(data)
          props.showOrHideEdit();
        })
    }
    
    let errors = data ? data.errors ? data.errors: "" : "";
    

      return (
          <>
            <div className="popup-container">
              
            <div className="popup-window edit-info">
              <div className="popup-top-stripe">Edit your profile information</div>
            <form action="" onSubmit={handleSubmit}>

              <div className="popup-text edit-profile">
              {/*<div className="profile-edit-form">*/}
                <label htmlFor="name"><strong>Username: </strong></label>
                <input type="text" id="name" name="name" value={formInputValues.name} onChange={handleTextValueChange}/><br/> 
                <span className="error-message">{errors.name}</span><br/>

                <label htmlFor="email"><strong>Email: </strong></label>
                <input className="email" type="text" id="email" name="email"  value={formInputValues.email} onChange={handleTextValueChange}/><br/> 
                <span className="error-message">{errors.email}</span><br/>
                  
              </div>

                <div className="popup-btns">
                  <input type="submit" className="btn btn-success submit-green" value="Submit"/>
                  <button onClick={props.showOrHideEdit} className="go-back btn btn-red">Cancel</button>   
                </div>
              
            </form>
            </div>
            </div>
          </>
        )
}

export default InfoEdit