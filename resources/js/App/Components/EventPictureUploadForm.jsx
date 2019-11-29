import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";

const EventPictureUploadForm = props => {
    const { eventId, callback } = props;
    const [formInputValues, setFormInputValues] = useState({
        image: []
    });

    const [data, setData] = useState({});
    const [errors, setErrors] = useState("");

    useEffect(() => {
        Object.keys(data).length > 0 ? window.location.reload() : "";
    }, [data]);

    let formData = new FormData();

    const handleSubmit = event => {
        event.preventDefault();

        formData.append("eventId", eventId);
        formInputValues.image.forEach(file => {
            formData.append("image[]", file);
        });

        fetch("addEventPicture", {
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

    const onDropAccepted = Files => {
        console.log("accepted", Files);
        setErrors("");

        setFormInputValues({
            ...formInputValues,
            image: Files
        });
    };

    const onDropRejected = Files => {
        setErrors("File size cannot be larger than 2MB.");
    };

    return (
        <>
            <div className="bigdetail-dropzone">
                <form
                    className="form"
                    action=""
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <Dropzone
                        onDropAccepted={onDropAccepted}
                        onDropRejected={onDropRejected}
                        accept="image/png, image/jpg, image/jpeg"
                        minSize={0}
                        maxSize={2097152}
                        multiple
                    >
                        {({
                            getRootProps,
                            getInputProps,
                            isDragActive,
                            acceptedFiles
                        }) => (
                            <>
                                <div
                                    className="dropzoneContainer"
                                    {...getRootProps()}
                                >
                                    <input {...getInputProps()} />
                                    {isDragActive
                                        ? "Drop it like it's hot!"
                                        : "Drag or click to upload a new image"}
                                    <p>{errors}</p>
                                    <ul>
                                        {acceptedFiles.length > 0 &&
                                            acceptedFiles.map(
                                                (acceptedFile, index) => (
                                                    <li
                                                        className="list-group-item list-group-item-success"
                                                        key={index}
                                                    >
                                                        {acceptedFile.name}
                                                    </li>
                                                )
                                            )}
                                    </ul>
                                </div>
                            </>
                        )}
                    </Dropzone>

                    <button type="submit" className="btn-add">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
};

export default EventPictureUploadForm;
