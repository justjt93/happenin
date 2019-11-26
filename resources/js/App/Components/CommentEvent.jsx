import React, { useState, useEffect } from "react";

const CommentEvent = props => {
    const [user, setUser] = useState();
    const [data, setData] = useState();
    const [comment, setComment] = useState("");
    const [commentStatus, setCommentStatus] = useState("");

    const { eventId, commentCallback } = props;

    //fetches logged-in user
    useEffect(() => {
        const loggedInUser = document
            .querySelector('meta[name="logged-in-user"]')
            .getAttribute("content");
        setUser(loggedInUser ? JSON.parse(loggedInUser) : loggedInUser);
    }, []);

    //adds a comment to the database or updates an existing comment
    const handleClick = () => {
        fetch("/comments", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "X-CSRF-TOKEN": document
                    .querySelector('meta[name="csrf-token"]')
                    .getAttribute("content")
            },
            body: JSON.stringify({
                user_id: user.id,
                event_id: eventId,
                description: comment
            })
        })
            .then(response => response.json())
            .then(response => setData(response));
    };

    //updates the comment state every time user types into the input
    const handleChange = e => {
        setComment(e.target.value);
    };

    useEffect(() => {
        if (data) {
            if (data.errors) {
                setCommentStatus(
                    <div className="alert alert-danger" role="alert">
                        {data.errors.description}
                    </div>
                );
            } else {
                setCommentStatus(
                    <div className="alert alert-success" role="alert">
                        Comment successfully added!
                    </div>
                );
                // commentCallback(data);
                setComment("");
            }
        }
    }, [data]);

    const rateEvent = user ? (
        <>
            <div className="add-comment">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add comment.."
                        name="description"
                        onChange={handleChange}
                        value={comment}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-success"
                            onClick={handleClick}
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
            {commentStatus}
        </>
    ) : (
        ""
    );

    return rateEvent;
};
export default CommentEvent;
