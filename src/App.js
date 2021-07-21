import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Button, Checkbox, Dimmer, Divider, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { SearchBar } from "./comps/SearchBar";
import { Cards } from "./comps/Cards";
import Filter from "./comps/Filter";

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noBook, setNoBook] = useState(false);
  const [filter, setFilter] = useState('all');

  const handleClick = ({ value, filter }) => {
    setLoading(true);
      fetch(`https://madhu.ninja/python/search/${filter}?${filter}=${value}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
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

    const handleFilter = (value) => {
      setFilter(value)
    }

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
        <h1>Search for Books</h1>
        <SearchBar handleClick={handleClick}></SearchBar>
        {loading === true && (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
      </div>

      {books.length > 0 && (
        <div>
          <Divider />
            <Filter handleFilter={handleFilter}/>
          <Divider />
          <Cards filter={filter} books={books}></Cards>
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
