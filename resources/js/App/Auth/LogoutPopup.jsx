import React from 'react';

export default class LogoutPopup extends React.Component {
    
  yesClick = () => {
    this.props.logoutCallback(true);
  } 

  noClick = () => {
    this.props.logoutCallback(false);
  } 
  
  render() {
      return (
          <>
            <div className="popup-container">
              <div className="popup-window">
                <div className="popup-top-stripe">Confirm Logout</div>
                <div className="popup-text">Are you sure you want log out?</div>
                <div className="popup-btns">
                  <div className="btn btn-green" onClick={this.yesClick}>yes</div>
                  <div className="btn btn-red" onClick={this.noClick}>no</div>
                </div>
              </div>
            </div>
          </>
        )
    }
}