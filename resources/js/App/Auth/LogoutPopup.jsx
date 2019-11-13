import React from 'react';

const LogoutPopup = (props) => {
    
  const yesClick = () => {
    props.logoutCallback(true);
  } 

  const noClick = () => {
    props.logoutCallback(false);
  } 
  
  return (
          <>
            <div className="popup-container">
              <div className="popup-window">
                <div className="popup-top-stripe">Confirm Logout</div>
                <div className="popup-text">Are you sure you want log out?</div>
                <div className="popup-btns">
                  <div className="btn btn-green" onClick={yesClick}>yes</div>
                  <div className="btn btn-red" onClick={noClick}>no</div>
                </div>
              </div>
            </div>
          </>
        )
}

export default LogoutPopup