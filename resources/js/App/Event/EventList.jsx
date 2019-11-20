import React, { useState, useEffect } from "react";
import Menu from "../Components/Menu.jsx";
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Spinner
} from "reactstrap";
import EventListItems from "./EventListItems.jsx";
import TypeFilter from "./TypeFilter.jsx";

const EventList = () => {
    const [data, setData] = useState();
    const [typeData, setTypeData] = useState();

    //string containing active types
    let typeStr = "";

    useEffect(() => {
        fetch("/api/events/paginated")
            .then(response => response.json())
            .then(response => setData(response));
    }, []);

    //fetches new events on pagination click
    const handlePaginationClick = e => {
        fetch(`/api/events/paginated?page=${e.target.innerHTML}`)
            .then(response => response.json())
            .then(response => setData(response));
    };

    for (let i = 0; i < 3; i++) {
        console.log("pes");
    }

    useEffect(() => {
        if (data) {
            typeStr = "";
            for (const type in typeData) {
                if (typeData[type]) {
                    typeStr += type;
                }
            }
        }
        console.log(typeStr);
    }, [typeData]);

    //creates pagination in reactstrap
    const loadPagination = () => {
        let pagesArr = [];
        for (let i = 1; i < data.last_page + 1; i++) {
            pagesArr.push(
                <PaginationItem key={i}>
                    <PaginationLink onClick={handlePaginationClick}>
                        {i}
                    </PaginationLink>
                </PaginationItem>
            );
        }

        return (
            <div className="pagination">
                <Pagination size="sm" aria-label="Page navigation example">
                    {pagesArr}
                </Pagination>
            </div>
        );
    };

    const typeCallback = answer => {
        //communication with the TypeFilter component
        setTypeData(answer);
    };

    const pagination = data ? loadPagination() : "";

    return (
        <>
            <Menu />
            <div className="event-list">
                {pagination}
                <TypeFilter typeCallback={typeCallback} />
                <EventListItems data={data} />
            </div>
        </>
    );
};

export default EventList;
