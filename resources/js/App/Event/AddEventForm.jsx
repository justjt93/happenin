import React, { useState, useEffect } from "react";
import Dropzone from "react-dropzone";
import { log } from "util";

const AddEventForm = () => {
    //variables storing today's date and date in two days to be put in the form
    const today = new Date();
    let dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
    const now = `${today.getFullYear()}-${today.getMonth() +
        1}-${today.getDate()}T${today.getHours()}:${today.getMinutes()}`;
    const inTwoDays = `${dayAfterTomorrow.getFullYear()}-${dayAfterTomorrow.getMonth() +
        1}-${("0" + dayAfterTomorrow.getDate()).slice(
        -2
    )}T${dayAfterTomorrow.getHours()}:${dayAfterTomorrow.getMinutes()}`;

    console.log(inTwoDays);

    const [formInputValues, setFormInputValues] = useState({
        title: "",
        address: "",
        starts_at: now,
        ends_at: inTwoDays,
        description: "",
        data: null,
        image: []
    });
    const [type_id, setType_id] = useState("");
    const [data, setData] = useState();
    const [errors, setErrors] = useState("");

    const handleTextValueChange = e => {
        setFormInputValues({
            ...formInputValues,
            [e.target.id]: e.target.value
        });
    };

    const handleCategorySelection = event => {
        setType_id(event.target.value);
    };

    useEffect(() => {
        data ? (data.id ? location.replace("/") : null) : null;
    });

    let formData = new FormData();

    const handleSubmit = event => {
        event.preventDefault();

        formData.append("title", formInputValues.title);
        formData.append("address", formInputValues.address);
        formData.append("starts_at", formInputValues.starts_at);
        formData.append("ends_at", formInputValues.ends_at);
        formData.append("description", formInputValues.description);
        formInputValues.image.forEach(file => {
            formData.append("image[]", file);
        });

        formData.append("type_id", type_id);

        fetch("/events", {
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

    const onDropAccepted = acceptedFiles => {
        setErrors("");
        setFormInputValues({
            ...formInputValues,
            image: acceptedFiles
        });
    };

    const onDropRejected = Files => {
        setErrors("File size cannot be larger than 2MB.");
    };

    return (
        <>
            <div className="add-event-form">
                <h3>Add events nearby</h3>

                <form
                    className="form"
                    action=""
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <div className="dropzone">
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
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        {isDragActive
                                            ? "Drop it like it's hot!"
                                            : "Click me or drag a file to upload!"}
                                        <p>{errors}</p>
                                        <div className="accepted-files">
                                            {acceptedFiles.length > 0 &&
                                                acceptedFiles.map(
                                                    (acceptedFile, index) => (
                                                        <div
                                                            className="list-group-item list-group-item-success accepted-file"
                                                            key={index}
                                                        >
                                                            {acceptedFile.name}
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                </>
                            )}
                        </Dropzone>
                    </div>
                    <div className="mid-group">
                        <div className="form-group">
                            <label htmlFor="name">Name: </label>
                            <br />
                            <input
                                className="form-control"
                                id="title"
                                type="text"
                                name="name"
                                placeholder="name of the event"
                                onChange={handleTextValueChange}
                            />
                            <br />
                            <span className="error-message">
                                {errors.title}
                            </span>
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Address: </label>
                            <br />
                            <input
                                className="form-control"
                                id="address"
                                type="text"
                                name="address"
                                placeholder="street name, number, postal code, city"
                                onChange={handleTextValueChange}
                            />
                            <br />
                            <span className="error-message">
                                {errors.address}
                            </span>
                        </div>

                        <div className="timeframe">
                            <div className="form-group">
                                <label htmlFor="starts_at">Starts at: </label>
                                <br />
                                <input
                                    type="datetime-local"
                                    name="starts_at"
                                    id="starts_at"
                                    value={formInputValues.starts_at}
                                    onChange={handleTextValueChange}
                                />
                                <br />
                                <span className="error-message">
                                    {errors.starts_at}
                                </span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="ends_at">Ends at: </label>
                                <br />
                                <input
                                    type="datetime-local"
                                    name="ends_at"
                                    id="ends_at"
                                    value={formInputValues.ends_at}
                                    onChange={handleTextValueChange}
                                />
                                <br />
                                <span className="error-message">
                                    {errors.ends_at}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="form-group description">
                        <label htmlFor="description">Description: </label>
                        <br />
                        <textarea
                            rows="4"
                            cols="50"
                            className="form-control"
                            id="description"
                            name="description"
                            placeholder="say something about this event .."
                            onChange={handleTextValueChange}
                        ></textarea>
                        <br />
                        <span className="error-message">
                            {errors.description}
                        </span>
                    </div>

                    <div className="form-group categories">
                        <label htmlFor="type_id">Choose category: </label>
                        <br />

                        <div className="radio-btns">
                            <input
                                type="radio"
                                id="control_01"
                                name="type_id"
                                value="1"
                                checked={type_id === "1"}
                                onChange={handleCategorySelection}
                            />
                            <label htmlFor="control_01" className="radio-art">
                                art
                            </label>

                            <input
                                type="radio"
                                id="control_02"
                                name="type_id"
                                value="2"
                                checked={type_id === "2"}
                                onChange={handleCategorySelection}
                            />
                            <label htmlFor="control_02">music</label>

                            <input
                                type="radio"
                                id="control_03"
                                name="type_id"
                                value="3"
                                checked={type_id === "3"}
                                onChange={handleCategorySelection}
                            />
                            <label htmlFor="control_03">sport</label>

                            <input
                                type="radio"
                                id="control_04"
                                name="type_id"
                                value="4"
                                checked={type_id === "4"}
                                onChange={handleCategorySelection}
                            />
                            <label htmlFor="control_04">chill</label>

                            <input
                                type="radio"
                                id="control_05"
                                name="type_id"
                                value="5"
                                checked={type_id === "5"}
                                onChange={handleCategorySelection}
                            />
                            <label htmlFor="control_05">social</label>
                            <br />
                            <span className="error-message">
                                {errors.type_id}
                            </span>
                        </div>
                    </div>

                    <button type="submit" className="btn-add">
                        Add
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddEventForm;
