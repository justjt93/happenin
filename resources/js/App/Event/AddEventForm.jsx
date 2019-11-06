import React from 'react';

export default class AddEventForm extends React.Component {
   
  render() {
        
    return (
        <>
          <h3>Add events nearby</h3>
       
          <form action=" " method="POST">
            <div className="form-group">
              <label htmlFor="name">Name: </label><br/>
              <input className="form-control" id="name" type="text" name="name" placeholder="name of the event" />
            </div>
          
            <div className="form-group">
              <label htmlFor="name">Adress: </label><br/>
              <input className="form-control" id="adress" type="text" name="adress" placeholder="street name, number, postal code and city" />
            </div>

            <div className="form-group">
              <label htmlFor="name">Starts at: </label><br/>
              <input type="datetime-local" value="2019-09-11T19:20" /> 
            </div>

            <div className="form-group">
              <label htmlFor="name">Ends at: </label><br/>
              <input type="datetime-local" value="2019-09-11T19:20"/> 
            </div>

            <div className="form-group">
                <label htmlFor="name">Description: </label><br/>
                <textarea rows="4" cols="50" className="form-control" id="description" name="description" placeholder="say something about this event .."></textarea>
            </div>

            <div className="form-group categories">
              <label htmlFor="name">Choose categroy: </label><br/>
              <button type="button" className="btn art">Art</button>
              <button type="button" className="btn music">Music</button>
              <button type="button" className="btn sport">Sport</button><br/><br/>
              <button type="button" className="btn chill">Chill</button>
              <button type="button" className="btn social">Social</button>
            </div>

            <br/><br/><br/>
            <button type="submit" className="btn-sign-up">Add</button>
          
          </form>    
        </>
      )
  }
}