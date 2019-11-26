import React from "react";
import CarouselComp from "./CarouselComp.jsx";
import HoverCloseBtn from "./HoverCloseBtn.jsx";
import RateEvent from "./RateEvent.jsx";
import CommentEvent from "./CommentEvent.jsx";
import { Button, Alert, Card, CardBody, CardTitle, CardText } from "reactstrap";

const BigDetail = props => {
    const { setBigDetailOpen, bigDetailOpen } = props;

    const handleClose = () => {
        setBigDetailOpen(null);
    };

    const comments = bigDetailOpen.comments.reverse().map(item => {
        return (
            <Card key={item.id}>
                <CardBody>
                    <CardTitle>Comment</CardTitle>
                    <CardText>{item.description}</CardText>
                    <CardText>
                        <small className="text-muted">{item.created_at}</small>
                    </CardText>
                </CardBody>
            </Card>
        );
    });

    const commentCallback = (comment) => {
        setBigDetailOpen({
            ...bigDetailOpen,
            comments: [...bigDetailOpen.comments, comment]
        })
    }

    return (
        <div className="bigdetail">
                <CarouselComp images={bigDetailOpen.images}/>
                <HoverCloseBtn handleCloseBigDetail={handleClose} />
                <div className="infobox-wrap">
                    <h2>{bigDetailOpen.title}</h2>
                    <p className="infobox-address">{bigDetailOpen.address}</p>
                    <RateEvent
                    eventId={bigDetailOpen.id}
                    />
                    <hr />
                    <div className="startEndWrap">
                        <Alert color="success">
                            Event starts at: {bigDetailOpen.starts_at}
                        </Alert>
                        <Alert color="danger">
                            Event finishes at: {bigDetailOpen.ends_at}
                        </Alert>
                    </div>
                    <p className="infobox-eventdesc">
                        {bigDetailOpen.description}
                    </p>
                    <div className="infobox-ratingbtn-wrap">
                        <p>10/10 bus drivers recommend</p>
                        <Button
                            color="success"
                            onClick={() => {
                                console.log("Action to add photo");
                            }}
                        >
                            Add a photo
                        </Button>
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
