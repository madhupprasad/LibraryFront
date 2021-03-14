import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./search.scss";
import {
  Button,
  Card,
  Checkbox,
  Dimmer,
  Divider,
  Loader,
  Popup,
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const SearchBar = ({ handleClick }) => {
  const [value, setValue] = useState("");
  let [filter, setFilter] = useState("Book");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleClick({ value, filter });
    }
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <div className="search-box">
        <input
          type="search"
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

const Cards = ({ books }) => {
  const bookslist = books.map((item) => {
    return (
      <Card
        href={item.Mirror_1}
        key={item.ID}
        header={item.Title}
        meta={item.Extension}
        description={item.Author}
      ></Card>
    );
  });

  return <Card.Group centered> {bookslist} </Card.Group>;
};

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noBook, setNoBook] = useState(false);
  const handleClick = ({ value, filter }) => {
    setLoading(true);

    console.log(filter);

    if (filter === "Book") {
      fetch(`http://localhost:5000/search/bybook?bookname=${value}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.books);
          if (data.books.length > 0) {
            setBooks(data.books);
            setNoBook(false);
          } else {
            setBooks([]);
            setNoBook(true);
          }
          setLoading(false);
        });
    } else if (filter === "Author") {
      fetch(`http://localhost:5000/search/byauthor?authorname=${value}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data.books);
          if (data.books.length > 0) {
            setBooks(data.books);
            setNoBook(false);
          } else {
            setBooks([]);
            setNoBook(true);
          }
          setLoading(false);
        });
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <h1>LIBRARY 2.0</h1>
        <SearchBar handleClick={handleClick}></SearchBar>
        {loading === true && (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
      </div>

      {books.length > 0 && (
        <div>
          <Divider horizontal>The Books I Found</Divider>
          <Cards books={books}></Cards>
        </div>
      )}
      {noBook && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <picture>
            <img
              src="https://i.imgur.com/lKJiT77.png"
              style={{ width: "85%" }}
            />
          </picture>
          <h3 style={{ textAlign: "center" }}>
            He tore the book you are looking for !
          </h3>
        </div>
      )}
    </div>
  );
};

ReactDOM.render(<App></App>, document.getElementById("root"));
