import React, { useEffect, useRef, useState } from "react";
import { Button, Icon, Input, Popup } from "semantic-ui-react";
import "../styles/search.scss";


export const SearchBar = ({ handleClick }) => {
  const [value, setValue] = useState("");
  let [filter, setFilter] = useState("bookname");
  const searchInput = useRef(null);

  useEffect(() => {
    // current property is refered to input element
    searchInput.current.focus();
  }, []);

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

  const handleFilter = (value) => {
    setFilter(value);
  };

  return (
    <div>
      <div className="search-box">
        <Input
          size = 'huge'
          ref={searchInput}
          type="text"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <div>

        <Button.Group>
          <Button positive = { filter === 'bookname' ? true : false} onClick = {()=>handleFilter('bookname')}>Book Name </Button>
          <Button.Or />
          <Button positive = {  filter === 'authorname' ? true : false} onClick = {()=>handleFilter('authorname')}>Author Name </Button>
        </Button.Group>
        </div>
      </div>
    </div>
  );
};
