import React, {useState, useEffect} from 'react';
import Menu from "../Components/Menu.jsx";
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import EventListItems from "./EventListItems.jsx";

const EventList = () => {
  const [data, setData] = useState();

  useEffect(() => {
      fetch("/api/events/paginated")
          .then(response => response.json())
          .then(response => setData(response));
  }, []);

  // useEffect(() => {
  //   console.log(data);
  // });

  //fetches new events on pagination click
  const handlePaginationClick = (e) => {
    fetch(`/api/events/paginated?page=${e.target.innerHTML}`)
          .then(response => response.json())
          .then(response => setData(response));
  }

  //creates pagination in reactstrap
  const loadPagination = () => {
    let pagesArr = [];
    for(let i = 1; i < data.last_page + 1; i++) {
      pagesArr.push(
        <PaginationItem key={i}>
          <PaginationLink onClick={handlePaginationClick}>
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    
    return (
      <div className="pagination">
        <Pagination size="sm" aria-label="Page navigation example">
          {pagesArr}
        </Pagination>  
      </div>
    )
  }
  
  const pagination = data ? 
  loadPagination()
  :
  "Loading";


  return (
      <>
        <Menu />
        <div className="event-list">
          {pagination}
          <EventListItems
          data={data}
          />
        </div>
      </>
  )
}

export default EventList