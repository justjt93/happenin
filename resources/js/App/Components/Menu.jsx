import React from 'react';

export default class Menu extends React.Component {
    constructor(props) {
        super(props);
  
        this.state = {
            logged_in: null,
            user: null
        };
      }

    openNav = () => {
        document.getElementById("sidenav").style.width = "250px";
        document.getElementById("burger").style.display = "none";
    }

    closeNav = () => {
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("burger").style.display = "flex";
    }

    handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
          });
        //   .then(location.reload(true)); 
        // location.reload(true);

        this.setState({
            logged_in: false
        });
    }

    componentDidMount() {
        const loggedInUser = (document.querySelector('meta[name="logged-in-user"]').getAttribute('content'));

        this.setState({
            logged_in: loggedInUser !== ""
        });
    }
    
    render() {
        let login = "loading...";
        let logout;

        if(this.state.logged_in) {
            login = <div className="sidenav-item"><i className="fas fa-user-circle"></i> {JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')).name}</div>;
            logout = <div className="sidenav-item" onClick={this.handleLogout}>Logout</div>;
        } else if (this.state.logged_in === false) {
            login = <a href="/login"><div className="sidenav-item">Login</div></a>;
        }
        
        return (
            <>
                <div className="menu">
                    <a href="/" className="logo"><h2>happenin'</h2></a>
                    <div className="burger" id="burger" onClick={this.openNav}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="sidenav" id="sidenav">
                    <div className="close-sidenav" onClick={this.closeNav}>&times;</div>
                    {login}
                    <a href="#"><div className="sidenav-item">Test</div></a>
                    <a href="#"><div className="sidenav-item">Test</div></a>
                    <a href="#"><div className="sidenav-item">Test</div></a>
                    {logout}
                </div>
            </>
        )
    }
}