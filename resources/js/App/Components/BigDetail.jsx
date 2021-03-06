import React, { useState, useEffect } from "react";
import CarouselComp from "./CarouselComp.jsx";
import HoverCloseBtn from "./HoverCloseBtn.jsx";
import RateEvent from "./RateEvent.jsx";
import CommentEvent from "./CommentEvent.jsx";
import EventPictureUploadForm from "./EventPictureUploadForm.jsx";
import { Button, Alert, Card, CardBody, CardTitle, CardText } from "reactstrap";

const BigDetail = props => {
    const { setBigDetailOpen, bigDetailOpen } = props;

    if (bigDetailOpen == null) return null;

    const handleClose = () => {
        setBigDetailOpen(null);
    };

    const avatar = item => {
        if (item.user) {
            if (item.user.avatar) {
                return item.user.avatar;
            }
        }
        return "https://institutogoldenprana.com.br/wp-content/uploads/2015/08/no-avatar-25359d55aa3c93ab3466622fd2ce712d1.jpg";
    };

    const comments = bigDetailOpen.comments.map(item => {
        const date = new Date(item.created_at);

        return (
            <Card key={item.id}>
                <CardBody>
                    <CardTitle>
                        <img className="avatar-comment" src={avatar(item)} />
                        <div className="userdetail-comment">
                            {item.user ? item.user.name : ""}
                            <small className="text-muted">{`${date.getDate()}. ${date.getMonth() +
                                1}. ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}</small>
                        </div>
                    </CardTitle>
                    <CardText>{item.description}</CardText>
                    <CardText></CardText>
                </CardBody>
            </Card>
        );
    });

    const commentCallback = comment => {
        setBigDetailOpen({
            ...bigDetailOpen,
            comments: [comment, ...bigDetailOpen.comments]
        });
    };

    return (
        <div className="bigdetail">
            <CarouselComp images={bigDetailOpen.images} />
            <HoverCloseBtn handleCloseBigDetail={handleClose} />
            <div className="infobox-wrap">
                <h2>{bigDetailOpen.title}</h2>
                <p className="infobox-address">{bigDetailOpen.address}</p>
                <RateEvent eventId={bigDetailOpen.id} />
                <hr />
                <div className="startEndWrap">
                    <Alert color="success">
                        Starts at: {bigDetailOpen.starts_at}
                    </Alert>
                    <Alert color="danger">
                        Ends at: {bigDetailOpen.ends_at}
                    </Alert>
                </div>
                <p className="infobox-eventdesc">{bigDetailOpen.description}</p>
                <div className="infobox-ratingbtn-wrap">
                    <EventPictureUploadForm eventId={bigDetailOpen.id} />
                </div>
            </div>
            <CommentEvent
                eventId={bigDetailOpen.id}
                commentCallback={commentCallback}
            />
            {comments}
        </div>
    );
};
export default BigDetail;
