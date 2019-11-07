import React from 'react';
import Menu from './Menu.jsx';
import Map from './Map.jsx';
import Footer from './Footer.jsx';


export default class App extends React.Component {
    
    render() {
      return (
          <>
              <Menu />
              <Map />
              <button className="addBtn"
            //    action={/events/create}
               >+</button>
               <Footer/>
          </>
        )
    }
}