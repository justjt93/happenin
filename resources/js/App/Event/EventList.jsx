import React, { useState, useEffect } from "react";
import Menu from "../Components/Menu.jsx";
import { PaginationItem, PaginationLink, Pagination } from 'reactstrap';
import EventListItems from "./EventListItems.jsx";
import TypeFilter from "./TypeFilter.jsx";

const EventList = () => {
    const [data, setData] = useState();
    const [typeData, setTypeData] = useState();
    const [typeStr, setTypeStr] = useState(""); 

    //initial fetch, fetches all events paginated
    useEffect(() => {
        fetch("/api/events/paginated")
            .then(response => response.json())
            .then(response => setData(response));
    }, []);

    //fetches new events on pagination click
    const handlePaginationClick = e => {
        let URL;

        if (typeStr === "") {
            URL = `/api/events/paginated?page=${e.target.innerHTML}`;
        } else {
            URL = `/api/events/paginated?type=${typeStr}&page=${e.target.innerHTML}`;
        }

        fetch(URL)
            .then(response => response.json())
            .then(response => setData(response));
    };

    //creates string for the type query
    useEffect(() => {
        if (data) {
            setTypeStr("");
            for (const type in typeData) {
                if (typeData[type]) {
                    setTypeStr(prevState => prevState + type);
                }
            }
        }
    }, [typeData]);

    //fetches new API whenever user clicks on one of the types
    useEffect(() => {
        fetch(`/api/events/paginated?type=${typeStr}`)
                .then(response => response.json())
                .then(response => setData(response));
    }, [typeStr]);

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
