import React from 'react';
import Menu from './Menu.jsx';
import Map from './Map.jsx';

export default class App extends React.Component {
    
    render() {
      return (
          <>
              <Menu />
              <Map />
          </>
        )
    }
}