import React, { useState, useEffect } from "react";
import { Button } from "reactstrap";

const UserPictureUploadForm = props => {
    const { user } = props;
    const [formInputValues, setFormInputValues] = useState({
        user_id: null,
        avatar: {}
    });
    const [data, setData] = useState({});

    const handleFileUpload = e => {
        document.getElementsByClassName("avatarSubmitBtn")[0].style.display =
            "block";
        document.getElementsByClassName("avatarUploadLabel")[0].style.display =
            "none";

        document.getElementsByClassName(
            "fileUploadNameField"
        )[0].style.display = "block";

        setFormInputValues({
            ...formInputValues,
            avatar: event.target.files[0]
        });
    };

    useEffect(() => {
        document.getElementsByClassName("fileUploadNameField")[0].innerText =
            formInputValues.avatar.name;
    }, [formInputValues]);

    useEffect(() => {
        Object.keys(data).length > 0 ? window.location.reload() : "";
    }, [data]);

    let formData = new FormData();

    const handleSubmit = event => {
        event.preventDefault();

        formData.append("user_id", user.id);
        formData.append("avatar", formInputValues.avatar);

        fetch("/userdetail/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")
            },
            body: formData
        })
            .then(response => response.json())
            .then(data => setData(data));
    };

    return (
        <div className="userPicUploadContainer">
            <form
                className="form"
                action=""
                method="POST"
                onSubmit={handleSubmit}
            >
                <input
                    type="file"
                    name="file"
                    id="file-upload"
                    onChange={handleFileUpload}
                />

                <label
                    color="info"
                    htmlFor="file-upload"
                    className="avatarUploadLabel"
                >
                    New picture
                </label>

                <p className="fileUploadNameField"></p>

                <div className="avatarSubmitBtn">
                    <Button type="submit" color="success">
                        Upload picture
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default UserPictureUploadForm;
