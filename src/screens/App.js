import React, { useContext, useEffect, useState } from "react";
import { Dimmer, Divider, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { SearchBar } from "../comps/SearchBar";
import { Cards } from "../comps/Cards";
import Filter from "../comps/Filter";
import { useHistory } from "react-router";
import { getUserBooks, protectedAuth, search } from "../services/auth";
import Cookies from "universal-cookie/es6";
import Navbar from "./Header";
import { userCred } from "../Router";
import { makeStyles } from "@material-ui/styles";

const cookie = new Cookies();

const useStyles = makeStyles((theme) => ({
  h1: {
    color: "white",
  },
  flexCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noBook, setNoBook] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isUserBooks, setIsUserBooks] = useState(false);
  const history = useHistory();

  const { userName, setUserName } = useContext(userCred);
  const classes = useStyles();

  useEffect(() => {
    const access_token = cookie.get("access_token_lib");
    if (access_token) {
      protectedAuth(access_token).then((res) => {
        setUserName(res);
      });
    } else {
      history.replace("/auth");
    }
  }, []);

  const getUserBooksHandler = (userName) => {
    setLoading(true);
    getUserBooks({ userName }).then((data) => {
      if (data.length > 0) {
        setBooks(data);
        setNoBook(false);
        setIsUserBooks(true);
      } else {
        setBooks([]);
        setNoBook(true);
      }
      setLoading(false);
    });
  };

  const handleSearch = ({ value, filter }) => {
    // https://madhu.ninja/python/search/bybook?${filter}=${value}
    setLoading(true);
    search({ filter, value }).then((data) => {
      if (data.books.length > 0) {
        setBooks(data.books);
        setNoBook(false);
        setIsUserBooks(false);
      } else {
        setBooks([]);
        setNoBook(true);
      }
      setLoading(false);
    });
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  return (
    <div>
      <Navbar name={userName || "anonymous"} handler={getUserBooksHandler} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <h1 className={classes.h1}>Search for Books</h1>
        <SearchBar handleClick={handleSearch}></SearchBar>
        {loading === true && (
          <Dimmer active>
            <Loader />
          </Dimmer>
        )}
      </div>
      {books.length > 0 && (
        <div>
          <Divider />
          <Filter handleFilter={handleFilter} />
          <Divider />
          <Cards
            filter={filter}
            books={books}
            isUserBooks={isUserBooks}
          ></Cards>
        </div>
      )}
      {noBook && (
        <div className={classes.flexCenter}>
          <h3
            style={{ textAlign: "center", color: "white", marginTop: "10px" }}
          >
            No Book Found
          </h3>
        </div>
      )}
    </div>
  );
};
