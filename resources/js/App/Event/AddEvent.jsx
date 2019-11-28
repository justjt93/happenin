import React from "react";
import Menu from "../Components/Menu.jsx";
import Footer from "../Components/Footer.jsx";
import AddEventForm from "./AddEventForm";

const AddEvent = () => {
    return (
        <>
            <Menu />
            <div className="auth-container">
                <AddEventForm />
            </div>
            <Footer />
        </>
    );
};

export default AddEvent;
