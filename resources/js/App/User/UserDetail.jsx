import React from 'react';
import Menu from '../Components/Menu.jsx';
import Footer from '../Components/Footer.jsx';
import {Router, Link, Route} from 'react-router-dom';
import history from './history';
import InfoEdit from './InfoEdit.jsx';
import PasswordEdit from './PasswordEdit.jsx';
import UserEvents from './UserEvents.jsx';
import { Button } from 'reactstrap';


const UserDetail = () => {
    
      const user = (JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')));
      const userEvents = (JSON.parse(document.querySelector('meta[name="user-events"]').getAttribute('content')));
      const date = new Date(user.created_at);

      return (
          <>
            <div className="user-detail">
              <Menu />
              <div className="user-profile">

              <h3>Your Profile Info</h3>

                <div className="amazing-avatar">
                  <img src={user.avatar}></img>
                </div>

                <div className="personal-info">
                  <div>
                    <p><strong>username:</strong> {user.name}</p>
                    <p><strong>email:</strong> {user.email}</p>
                    <p><strong>member since:</strong> {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                  </div>
                </div>

                <Router history={history}>
                  
                  <div className="profile-button">
                    <Link to="/userdetail/editinfo"><Button color="info">Edit Info</Button></Link>
                    <Link to="/userdetail/editpassword"><Button color="info">Change Password</Button></Link>
                  </div>

                  <Route exact path='/userdetail/editinfo' component={InfoEdit} />
                  <Route exact path='/userdetail/editpassword' component={PasswordEdit} />
                </Router>

              </div>

                <div className="profile-comments">
                  <UserEvents
                  user={user}
                  userEvents={userEvents}
                  />
                </div>
              
              <Footer />
            </div>
          </>
        )
}

export default UserDetail