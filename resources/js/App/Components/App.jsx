import React from "react";
import Menu from "./Menu.jsx";
import Map from "./Map.jsx";
import Footer from "./Footer.jsx";
import EventList from "../Event/EventList.jsx";

const App = () => {
    return (
        <>
            <Menu />
            <div className="containerList">
                <EventList />
            </div>
            <div className="containerMap">
                <Map />
            </div>
            <Footer />
        </>
    );
};

export default App;
