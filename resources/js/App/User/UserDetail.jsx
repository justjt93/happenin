import React from 'react';
import Menu from "../Components/Menu.jsx";
import Footer from "../Components/Footer.jsx";

export default class UserDetail extends React.Component {
    
    render() {
      const user = (JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')));
      const date = new Date(user.created_at);
      console.log(user);
      
      

      return (
          <>
            <div className="user-detail">
              <Menu />
              <div className="user-item">
                <p>username: {user.name}</p>
                <p>email: {user.email}</p>
                <p>member since: {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</p>
                <a href="userdetail/edit">Edit info</a>
              </div>
              <Footer />
            </div>
          </>
        )
    }
}