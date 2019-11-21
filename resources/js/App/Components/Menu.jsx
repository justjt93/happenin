import React, {useState, useEffect} from 'react'
import LogoutPopup from "../Auth/LogoutPopup.jsx"

 const Menu = () => {
    const [logged_in, setLogged_in] = useState()
    const [show_popup, setShow_popup] = useState(false)

    const openNav = () => {
        document.getElementById("sidenav").style.width = "250px"
        document.getElementById("burger").style.display = "none"
    }

    const closeNav = () => {
        document.getElementById("sidenav").style.width = "0"
        document.getElementById("burger").style.display = "flex"
    }

    const confirmLogout = () => {
        setShow_popup(true)
    }

    const logoutCallback = (answer) => { //communication with LogoutPopup component
        answer ? handleLogout() : setShow_popup(false)
    }
    
    const handleLogout = () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept':       'application/json',
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content')
            },
          });

        setShow_popup(false)
        setLogged_in(false)
    }

    useEffect(() => {
        const loggedInUser = (document.querySelector('meta[name="logged-in-user"]').getAttribute('content'));
        setLogged_in(loggedInUser !== "")
      }, []);
    
    
    let login = "loading...";
    let logout;

    if(logged_in) {
        login = <a href="/userdetail"><div className="sidenav-item"><i className="fas fa-user-circle"></i> {JSON.parse(document.querySelector('meta[name="logged-in-user"]').getAttribute('content')).name}</div></a>;
        logout = <div className="sidenav-item" onClick={confirmLogout}>Logout</div>;
    } else if (logged_in === false) {
        login = <a href="/login"><div className="sidenav-item">Login</div></a>;
    }
        
        return (
            <>
                <div className="menu">
                    <a href="/" className="logo"><h2>happenin'</h2></a>
                    <div className="burger" id="burger" onClick={openNav}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>

                    <div className="desktop-links">
                        
                        <a href="/events/create"><div className="sidenav-item"><i className="fas fa-plus"></i>  New event</div></a> 
                        {login}  
                        {logout}
                    </div>

                </div>
                <div className="sidenav" id="sidenav">
                    <div className="close-sidenav" onClick={closeNav}>&times;</div>
                    {login}
                    <a href="/events/create"><div className="sidenav-item"><i className="fas fa-plus"></i>  New event</div></a>
                    <a href="/eventlist"><div className="sidenav-item">Events</div></a>
                    {logout}
                </div>
                {show_popup ? <LogoutPopup logoutCallback={logoutCallback}/> : null}
            </>
        )
}

export default Menu