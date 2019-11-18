import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

 const InfoEdit = () => {
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
        .then(data => setData(data))
    }
    
    let errors = data ? data.errors ? data.errors: "" : "";
    let status = data ? data.status ? data.status: "" : "";


      return (
          <>
            <Link to="/userdetail/"><div className="go-back">X</div></Link>
            <form action="" onSubmit={handleSubmit}>
              <p>change user information</p>
              <label htmlFor="name">name</label>
              <input type="text" id="name" name="name" value={formInputValues.name} onChange={handleTextValueChange}/><br/> 
              <span className="error-message">{errors.name}</span><br/>

              <label htmlFor="email">email</label>
              <input type="text" id="email" name="email" value={formInputValues.email} onChange={handleTextValueChange}/><br/> 
              <span className="error-message">{errors.email}</span><br/>

              <input type="submit" value="Submit changes"/>
              <p className="complete-message">{status}</p>
            </form>
          </>
        )
}

export default InfoEdit