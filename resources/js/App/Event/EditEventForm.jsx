import React, {useState} from 'react';

const EditEventForm = (props) => {
  const {event} = props

  //dealing with different time formats
  const eventStart = event.starts_at.split(" ").join("T").slice(0, event.starts_at.length - 3);
  const eventEnd = event.ends_at.split(" ").join("T").slice(0, event.ends_at.length - 3);

  console.log(event);
  

  const [formInputValues, setFormInputValues] = useState({ title: event.title, address: event.address, starts_at: eventStart, ends_at: eventEnd, description: event.description,});
  const [type_id, setType_id] = useState(`${event.type_id}`)
  const [data, setData] = useState();
  
  const handleTextValueChange = e => {
    setFormInputValues({
      ...formInputValues,
      [e.target.id]: e.target.value
    })
  };

  const handleCategorySelection = (event) => {
    setType_id(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    fetch(`/events/edit/${event.id}`, {
      method: 'POST',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({
          title: formInputValues.title,
          address: formInputValues.address,
          starts_at: formInputValues.starts_at,
          ends_at: formInputValues.ends_at,
          description: formInputValues.description,
          type_id: type_id,         
      })
    })
    .then (response => response.json())
    .then(data => setData(data));
  }
        
    return (
        <>
          <div className="login-form">
          <h3>Add events nearby</h3>
       
          <form action="" method="POST" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name: </label><br/>
              <input className="form-control" id="title" type="text" name="name" placeholder="name of the event" onChange={handleTextValueChange} value={formInputValues.title}/>
            </div>
          
            <div className="form-group">
              <label htmlFor="address">Address: </label><br/>
              <input className="form-control" id="address" type="text" name="address" placeholder="street name, number, postal code and city" onChange={handleTextValueChange} value={formInputValues.address}/>
            </div>

            <div className="form-group">
              <label htmlFor="starts_at">Starts at: </label><br/>
              <input type="datetime-local" name="starts_at" id="starts_at" value={formInputValues.starts_at} onChange={handleTextValueChange}/> 
            </div>

            <div className="form-group">
              <label htmlFor="ends_at">Ends at: </label><br/>
              <input type="datetime-local" name="ends_at" id="ends_at" value={formInputValues.ends_at} onChange={handleTextValueChange}/> 
            </div>

            <div className="form-group">
                <label htmlFor="description">Description: </label><br/>
                <textarea rows="4" cols="50" className="form-control" id="description" name="description" placeholder="say something about this event .." onChange={handleTextValueChange} value={formInputValues.description}></textarea>
            </div>

            <div className="form-group categories">

            <label htmlFor="type_id">Choose categroy: </label><br/>

              <div className="radio-btns">
                <input type="radio" id="control_01" name="type_id" value='1' checked={type_id === "1"} onChange={handleCategorySelection} />
                <label htmlFor="control_01">art</label>

                <input type="radio" id="control_02" name="type_id" value="2"  checked={type_id === "2"} onChange={handleCategorySelection}/>
                <label htmlFor="control_02">music</label>

                <input type="radio" id="control_03" name="type_id" value="3"  checked={type_id === "3"} onChange={handleCategorySelection}/>
                <label htmlFor="control_03">sport</label>

                <input type="radio" id="control_04" name="type_id" value="4"  checked={type_id === "4"} onChange={handleCategorySelection}/>
                <label htmlFor="control_04">chill</label>

                <input type="radio" id="control_05" name="type_id" value="5"  checked={type_id === "5"} onChange={handleCategorySelection}/>
                <label htmlFor="control_05">social</label> 
              </div>       
              
            </div>

            <br/><br/><br/>
            <button type="submit" className="btn-sign-up">Edit</button>
          
          </form>  
          </div>  
        </>
      )
}

export default EditEventForm