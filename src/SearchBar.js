import React, { useState } from "react";
import { Popup } from "semantic-ui-react";

export const SearchBar = ({ handleClick }) => {
  const [value, setValue] = useState("");
  let [filter, setFilter] = useState("Book");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      if (value.length > 3) {
        handleClick({ value, filter });
      }
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search here..."
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button
          type="submit"
          onClick={() => handleClick({ value, filter })}
          className="search-btn"
          disabled={value.length < 4}
        >
          <Popup
            content="Type atleast 4 characters"
            trigger={<i className="fa fa-search"></i>}
          ></Popup>
        </button>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <div onChange={handleFilter}>
          <label>SEARCH BY - </label>
          <label>
            <input type="radio" value="Book" name="filter" defaultChecked />{" "}
            Book
          </label>
          <label>
            <input type="radio" value="Author" name="filter" /> Author
          </label>
        </div>
      </div>
    </div>
  );
};
