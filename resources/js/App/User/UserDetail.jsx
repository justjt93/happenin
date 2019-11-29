import React, {useState, useEffect} from "react";
import Menu from "../Components/Menu.jsx";
import Footer from "../Components/Footer.jsx";
import { Router, Link, Route } from "react-router-dom";
import history from "./history";
import InfoEdit from "./InfoEdit.jsx";
import PasswordEdit from "./PasswordEdit.jsx";
import UserEvents from "./UserEvents.jsx";
import { Button } from "reactstrap";

import UserPictureUploadForm from "./UserPictureUploadForm.jsx";

const UserDetail = () => {
    const [editPopup, setEditPopup] = useState(false);
    const [user, setUser] = useState(JSON.parse(
        document
            .querySelector('meta[name="logged-in-user"]')
            .getAttribute("content")
    ));
    const userEvents = JSON.parse(
        document
            .querySelector('meta[name="user-events"]')
            .getAttribute("content")
    );
    const date = new Date(user.created_at);

    const setUserData = (newUserName, newUserMail) => {
        let newUserState = {...user};
        newUserState.name = newUserName;
        newUserState.email = newUserMail;
        setUser(newUserState);
    }

    const showOrHideEdit = () => {
        setEditPopup(!editPopup);
    }

    //debugging
    useEffect(() => {
        console.log(user.avatar);
    }, []);

    return (
        <>
            <div className="user-detail">
                <Menu />

                <div className="overlay-profile">
                <div className="user-profile">
                    
                    <h3>Your Profile Page</h3>

                    <div className="amazing-avatar">
                        <img src={user.avatar ? user.avatar : "https://medgoldresources.com/wp-content/uploads/2018/02/avatar-placeholder.gif"}></img>
                    </div>

                    <UserPictureUploadForm user={user} />

                    <div className="personal-info">
                        <div>
                            <h5>Personal information</h5>
                            <p>
                                <strong>username:</strong> {user.name}
                            </p>
                            <p>
                                <strong>email:</strong> {user.email}
                            </p>
                            <p>
                                <strong>member since:</strong>{" "}
                                {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
                            </p>
                        </div>
                    </div>

                    <div className="profile-button">

                    <Button color="info" onClick={showOrHideEdit}>Edit Info</Button>
                    
                    {editPopup ? <InfoEdit setUserData={setUserData} showOrHideEdit={showOrHideEdit} /> : ""}
                    
                    <Router history={history}>
                      
                            <Link to="/userdetail/editpassword">
                                <Button color="info">Change Password</Button>
                            </Link>
                        

                        <Route
                            exact
                            path="/userdetail/editpassword"
                            component={PasswordEdit}
                        />
                    </Router>
                    
    
                        
                    </div>
                </div>
            </div>

                <div className="profile-comments">
                    <UserEvents user={user} userEvents={userEvents} />
                </div>

                <Footer />
            </div>
        </>
    );
};

export default UserDetail;
