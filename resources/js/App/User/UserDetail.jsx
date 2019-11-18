import React from 'react';
import Menu from '../Components/Menu.jsx';
import Footer from '../Components/Footer.jsx';
import {Router, Link, Route} from 'react-router-dom';
import history from './history';
import InfoEdit from './InfoEdit.jsx';
import PasswordEdit from './PasswordEdit.jsx';
import UserEvents from './UserEvents.jsx';

const UserDetail = () => {
    
      const user = (JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')));
      const userEvents = (JSON.parse(document.querySelector('meta[name="user-events"]').getAttribute('content')));
      const date = new Date(user.created_at);

      return (
          <>
            <div className="user-detail">
              <Menu />
              <div className="user-item">
                <p>username: {user.name}</p>
                <p>email: {user.email}</p>
                <p>member since: {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                <Router history={history}>
                  <Link to="/userdetail/editinfo"><button>Edit info</button></Link>
                  <Link to="/userdetail/editpassword"><button>Change password</button></Link>
                  <Route exact path='/userdetail/editinfo' component={InfoEdit} />
                  <Route exact path='/userdetail/editpassword' component={PasswordEdit} />
                </Router>
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