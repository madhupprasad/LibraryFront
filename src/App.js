import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./search.scss";
import { Button, Checkbox, Dimmer, Divider, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { SearchBar } from "./SearchBar";
import { Cards } from "./Cards";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noBook, setNoBook] = useState(false);
  const handleClick = ({ value, filter }) => {
    setLoading(true);

    console.log(filter);

    if (filter === "Book") {
      fetch(`https://madhu.ninja/python/search/bybook?bookname=${value}`)
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
      fetch(`https://madhu.ninja/python/search/byauthor?authorname=${value}`)
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
