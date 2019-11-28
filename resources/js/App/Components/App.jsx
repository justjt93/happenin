import React, { useEffect, useState } from "react";
import Menu from "./Menu.jsx";
import Map from "./Map.jsx";
import Footer from "./Footer.jsx";
import EventList from "../Event/EventList.jsx";
import OpeningAnimationPage from "./OpeningAnimationPage.jsx";

const App = () => {
    useEffect(() => {
        setTimeout(() => {
            document.getElementById("containerForAnimation").style.display =
                "none";
        }, 3500);
    }, []);

    return (
        <>
            <div id="containerForAnimation">
                <OpeningAnimationPage />
            </div>

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
        </>
    );
};

export default App;
