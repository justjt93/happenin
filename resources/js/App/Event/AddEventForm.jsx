import React, {useState} from 'react';

 const AddEventForm = () => {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [starts_at, setStarts_at] = useState();
    const [ends_at, setEnds_at] = useState();
    const [description, setDescription] = useState('');
    const [type, setType] = useState();
    const [data, setData] = useState();



    const handleNameChange = (event) => {
        setTitle(event.target.value)
    }

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value)
    }

    const handleStartTimeChange = (event) => {
        setStarts_at(event.target.value)
    }

    const handleEndTimeChange = (event) => {
        setEnds_at(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        fetch('/events', {
        method: 'POST',
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
        },
        body: JSON.stringify({
            title: title,
            address: address,
            starts_at: starts_at,
            ends_at: ends_at,
            description: description,
            type: type,         
        })
        })
        .then (response => response.json())
        .then(data => setData (data))
    }
        
    return (
        <>
          <div className="login-form">
          <h3>Add events nearby</h3>
       
          <form action="" method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name: </label><br/>
              <input className="form-control" id="name" type="text" name="name" placeholder="name of the event" onChange={handleNameChange}/>
            </div>
          
            <div className="form-group">
              <label htmlFor="address">Address: </label><br/>
              <input className="form-control" id="address" type="text" name="address" placeholder="street name, number, postal code and city" onChange={handleAddressChange} />
            </div>

            <div className="form-group">
              <label htmlFor="starts_at">Starts at: </label><br/>
              <input type="datetime-local" name="starts_at" value="2019-09-11T19:20" onChange={handleStartTimeChange}/> 
            </div>

            <div className="form-group">
              <label htmlFor="ends_atme">Ends at: </label><br/>
              <input type="datetime-local" value="2019-09-11T19:20"onChange={handleEndTimeChange}/> 
            </div>

            <div className="form-group">
                <label htmlFor="description">Description: </label><br/>
                <textarea rows="4" cols="50" className="form-control" id="description" name="description" placeholder="say something about this event .." onChange={handleDescriptionChange}></textarea>
            </div>

            <div className="form-group categories">

            <label htmlFor="type">Choose categroy: </label><br/>

              <div className="radio-btns">
                <input type="radio" id="control_01" name="select"value="1"  />
                <label htmlFor="control_01">art</label>

                <input type="radio" id="control_02" name="select"value="2"  />
                <label htmlFor="control_02">music</label>

                <input type="radio" id="control_03" name="select"value="3"  />
                <label htmlFor="control_03" defaultChecked >sport</label>

                <input type="radio" id="control_04" name="select"value="4"  />
                <label htmlFor="control_04">chill</label>

                <input type="radio" id="control_05" name="select"value="5"  />
                <label htmlFor="control_04">social</label> 
              </div>       

            {/*onClick={() => {
                setState({type: 'art'})
              }}*/}
              
            </div>

            <br/><br/><br/>
            <button type="submit" className="btn-sign-up">Add</button>
          
          </form>  
          </div>  
        </>
      )
}

export default AddEventForm