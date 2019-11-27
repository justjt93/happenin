import React, {useState} from "react";
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

    return (
        <>
            <div className="user-detail">
                <Menu />
                <div className="user-profile">
                    <h3>Your Profile Info</h3>

                    <div className="amazing-avatar">
                        <img src={user.avatar}></img>
                    </div>

                    <UserPictureUploadForm user={user} />

                    <div className="personal-info">
                        <div>
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

                    <Router history={history}>
                        <div className="profile-button">
                            <Link to="/userdetail/editpassword">
                                <Button color="info">Change Password</Button>
                            </Link>
                        </div>

                        <Route
                            exact
                            path="/userdetail/editpassword"
                            component={PasswordEdit}
                        />
                    </Router>
                    
                    <div className="profile-button">
                        <Button color="info" onClick={showOrHideEdit}>Edit Info</Button>
                    </div>
                    {editPopup ? <InfoEdit setUserData={setUserData} showOrHideEdit={showOrHideEdit} /> : ""}
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
