import React, {useState, useEffect} from "react";

const RateEvent = (props) => {
  const [user, setUser] = useState();
  const [data, setData] = useState(); 

  const {eventId} = props;

  //fetches logged-in user
  useEffect(() => {
    const loggedInUser = document.querySelector('meta[name="logged-in-user"]').getAttribute('content');
    setUser(loggedInUser ? JSON.parse(loggedInUser): loggedInUser);
  }, []);

  //checks whether user already rated this event and saves the response as data
  useEffect(() => {
    if(user) {
      fetch(`/api/rating?user=${user.id}&event=${eventId}`)
            .then(response => response.json())
            .then(response => setData(response));
    }
  }, [user]);

  //if the user has already voted, show the value in stars
  useEffect(() => {
    if (data) {
      resetStars();
    }
  }, [data]);

  const resetStars = () => {
    emptyStars();

    for (let i = 1; i <= data.value; i+= 1) {
      document.querySelector(`#star${i}`).classList.remove("far");
      document.querySelector(`#star${i}`).classList.add("fas", "full");
      document.querySelector('#vote-status').innerHTML = `Your rating: ${data.value} stars.`
    }
  }

  const emptyStars = () => {
    for (let i = 1; i <= 5; i+= 1) {
      document.querySelector(`#star${i}`).classList.remove("fas", "full");
      document.querySelector(`#star${i}`).classList.add("far");
    }
  }

  const handleMouseEnter = (no) => {
    emptyStars();

    for (let i = 1; i <= no; i+= 1) {
      document.querySelector(`#star${i}`).classList.remove("far");
      document.querySelector(`#star${i}`).classList.add("fas", "full");
    }  
  }

  const handleMouseLeave = () => {
    emptyStars();
  }

  const handleClick = (no) => {
      fetch("/ratings", {
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
            value: no
        })
    })
    .then(document.querySelector('#vote-status').innerHTML = "Thank you for rating this event!")
    .then(response => response.json())
    .then(response => setTimeout(() => setData(response), 750));
  }
  
  const rateEvent = user ? 
  <>
    
    <div className="star-rating">
      <div className="star-row" onMouseLeave={resetStars}>
        <i className="far fa-star pointer" id="star1" onMouseEnter={() => handleMouseEnter(1)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(1)}></i>
        <i className="far fa-star pointer" id="star2" onMouseEnter={() => handleMouseEnter(2)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(2)}></i>
        <i className="far fa-star pointer" id="star3" onMouseEnter={() => handleMouseEnter(3)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(3)}></i>
        <i className="far fa-star pointer" id="star4" onMouseEnter={() => handleMouseEnter(4)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(4)}></i>
        <i className="far fa-star pointer" id="star5" onMouseEnter={() => handleMouseEnter(5)} onMouseLeave={handleMouseLeave} onClick={() => handleClick(5)}></i>
      </div>
      <p id="vote-status">Click to vote</p>
    </div> 
  </>
  : 
  "";
  
  return (
        rateEvent
  );
};
export default RateEvent;
