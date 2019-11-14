import React from 'react';

export default class AddEventForm extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
        title: "",
        address: "",
        starts_at: "2019-09-11T19:20",
        ends_at: "2019-09-11T19:20",
        description:"",
        type_id: "",
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleStartTimeChange = this.handleStartTimeChange.bind(this);
    this.handleEndTimeChange = this.handleEndTimeChange.bind(this);
    this.handleCategorySelection = this.handleCategorySelection.bind(this);
     

  }

  handleNameChange = (event) => {
    this.setState({
      title: event.target.value,
    })
  }

  handleAddressChange = (event) => {
    this.setState({
      address: event.target.value,
    })
  }

  handleDescriptionChange = (event) => {
    this.setState({
      description: event.target.value,
    })
  }

  handleStartTimeChange = (event) => {
    this.setState({
      starts_at: event.target.value,
    })
  }

  handleEndTimeChange = (event) => {
    this.setState({
      ends_at: event.target.value,
    })
  }

  handleCategorySelection = (event) => {
    this.setState({
      type_id:event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    fetch('/events', {
      method: 'POST',
      headers: {
          'Accept':       'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
      },
      body: JSON.stringify({
          title: this.state.title,
          address: this.state.address,
          starts_at: this.state.starts_at,
          ends_at: this.state.ends_at,
          description: this.state.description,
          type_id: this.state.type_id,         
      })
    })
    .then (response => response.json())
    .then(data => this.setState ({
      response: data
    }));
  }

  render() {
        
    return (
        <>
          <div className="login-form">
          <h3>Add events nearby</h3>
       
          <form action="" method="POST" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name: </label><br/>
              <input className="form-control" id="name" type="text" name="name" placeholder="name of the event" onChange={this.handleNameChange}/>
            </div>
          
            <div className="form-group">
              <label htmlFor="address">Address: </label><br/>
              <input className="form-control" id="address" type="text" name="address" placeholder="street name, number, postal code and city" onChange={this.handleAddressChange} />
            </div>

            <div className="form-group">
              <label htmlFor="starts_at">Starts at: </label><br/>
              <input type="datetime-local" name="starts_at" value={this.handleStartTimeChange} onChange={this.handleStartTimeChange}/> 
            </div>

            <div className="form-group">
              <label htmlFor="ends_at">Ends at: </label><br/>
              <input type="datetime-local" name="ends_at" value={this.handleEndTimeChange} onChange={this.handleEndTimeChange}/> 
            </div>

            <div className="form-group">
                <label htmlFor="description">Description: </label><br/>
                <textarea rows="4" cols="50" className="form-control" id="description" name="description" placeholder="say something about this event .." onChange={this.handleDescriptionChange}></textarea>
            </div>

            <div className="form-group categories">

            <label htmlFor="type_id">Choose categroy: </label><br/>

              <div className="radio-btns">
                <input type="radio" id="control_01" name="type_id" value='1' checked={this.state.type_id === "1"} onChange={this.handleCategorySelection} />
                <label htmlFor="control_01">art</label>

                <input type="radio" id="control_02" name="type_id" value="2"  checked={this.state.type_id === "2"} onChange={this.handleCategorySelection}/>
                <label htmlFor="control_02">music</label>

                <input type="radio" id="control_03" name="type_id" value="3"  checked={this.state.type_id === "3"} onChange={this.handleCategorySelection}/>
                <label htmlFor="control_03" defaultChecked >sport</label>

                <input type="radio" id="control_04" name="type_id" value="4"  checked={this.state.type_id === "4"} onChange={this.handleCategorySelection}/>
                <label htmlFor="control_04">chill</label>

                <input type="radio" id="control_05" name="type_id" value="5"  checked={this.state.type_id === "5"} onChange={this.handleCategorySelection}/>
                <label htmlFor="control_04">social</label> 
              </div>       
              
            </div>

            <br/><br/><br/>
            <button type="submit" className="btn-sign-up">Add</button>
          
          </form>  
          </div>  
        </>
      )
  }
}