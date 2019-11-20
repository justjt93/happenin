import React, {useState, useEffect} from 'react';

 const TypeFilter = (props) => {
  const [active, setActive] = useState({
    '1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
  })

  useEffect(() => { //communcation with the parent
    props.typeCallback(active);
  },[active])

  

  const handleClick = (num, event) => {
    event.target.classList.toggle(`type-btn-${num}-active`);
    setActive({
      ...active,
      [num]: !active[num],
    })
  }

  return (
      <>
        <div className="type-filter">
          <div className="type-row">
            <div className="type-btn type-btn-1" onClick={() => handleClick("1", event)}>Art</div>
            <div className="type-btn type-btn-2" onClick={() => handleClick("2", event)}>Music</div>
            <div className="type-btn type-btn-3" onClick={() => handleClick("3", event)}>Sport</div>
            <div className="type-btn type-btn-4" onClick={() => handleClick("4", event)}>Chill</div>
            <div className="type-btn type-btn-5" onClick={() => handleClick("5", event)}>Party</div>
          </div>
        </div>
      </>
  )
}

export default TypeFilter