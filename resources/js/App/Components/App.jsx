import React, { useEffect, useState } from "react";
import Menu from "./Menu.jsx";
import Map from "./Map.jsx";
import Footer from "./Footer.jsx";
import EventList from "../Event/EventList.jsx";
import OpeningAnimationPage from "./OpeningAnimationPage.jsx";

const App = () => {
    useEffect(() => {
        if (localStorage.getItem("animationRan")) {
            document.getElementById("containerForAnimation").style.display =
                "none";
            return;
        }
        localStorage.setItem("animationRan", true);
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
