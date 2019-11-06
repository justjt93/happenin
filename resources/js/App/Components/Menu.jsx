import React from 'react';

export default class Menu extends React.Component {

    openNav = () => {
        document.getElementById("sidenav").style.width = "250px";
        document.getElementById("burger").style.display = "none";
    }

    closeNav = () => {
        document.getElementById("sidenav").style.width = "0";
        document.getElementById("burger").style.display = "flex";
    } 
    
    render() {
        return (
            <>
                <div className="menu">
                    <h2>happenin'</h2>
                    <div className="burger" id="burger" onClick={this.openNav}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="sidenav" id="sidenav">
                    <div className="close-sidenav" onClick={this.closeNav}>&times;</div>
                    <a href="#"><div className="sidenav-item">Login</div></a>
                    <a href="#"><div className="sidenav-item">Test</div></a>
                    <a href="#"><div className="sidenav-item">Test</div></a>
                    <a href="#"><div className="sidenav-item">Test</div></a>
                </div>
            </>
        )
    }
}