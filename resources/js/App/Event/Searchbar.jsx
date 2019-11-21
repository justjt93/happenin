import React from "react";
import { Input } from "reactstrap";

const Searchbar = props => {
    const { searchCallback } = props;

    const handleChange = (e) => {
      searchCallback(e.target.value);
    }

    return (
        <>
            <div className="searchbar mb-4">
                <Input
                    type="text"
                    placeholder="Search for events"
                    onChange={handleChange}
                />
            </div>
        </>
    );
};

export default Searchbar;
