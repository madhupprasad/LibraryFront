import React, { useContext, useEffect, useState } from "react";
import { Dimmer, Divider, Loader } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { SearchBar } from "../comps/SearchBar";
import { Cards } from "../comps/Cards";
import Filter from "../comps/Filter";
import { useHistory } from "react-router";
import {
  deleteBlog,
  getAllLikedBooks,
  getBlog,
  getUserBooks,
  postBlog,
  protectedAuth,
  search,
} from "../services/auth";
import Cookies from "universal-cookie/es6";
import Navbar from "./Header";
import { userCred } from "../Router";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Rating from "@mui/material/Rating";
import Info from "../comps/info";
import { Paper } from "@material-ui/core";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const cookie = new Cookies();

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  h1: {
    color: "white",
  },
  flexCenter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  post: {
    cursor: "pointer",
    transition: "all 0.1s linear",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
}));

export const App = () => {
  const { userName, setUserName } = useContext(userCred);
  const [postBlogVisible, setPostBlogVisible] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [noBook, setNoBook] = useState(false);
  const [filter, setFilter] = useState("all");
  const [isUserBooks, setIsUserBooks] = useState(false);
  const [topLiked, setTopLiked] = useState([]);
  const [showError, setShowError] = useState("");
  const [blogData, setBlogData] = useState({
    username: userName,
    title: postBlogVisible,
    content: "",
    rating: 1,
  });
  const [posts, setPosts] = useState([]);
  const [dialogue, setDialogue] = useState(false);
  const [selectedPost, setSelectedPost] = useState({
    id: "",
    title: "",
    content: "",
    username: "",
  });

  const history = useHistory();
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

    getAllLikedBooks().then((res) => {
      setTopLiked(res);
    });
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
      setPosts([]);
      setLoading(false);
    });
  };

  const getPosts = () => {
    setLoading(true);
    getBlog().then((res) => {
      setBooks([]);
      setPosts(res);
      setLoading(false);
      console.log(res);
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
      setPosts([]);
      setLoading(false);
    });
  };

  const handleFilter = (value) => {
    setFilter(value);
  };

  function handleClose() {}

  return (
    <div>
      <Navbar
        name={userName || "anonymous"}
        handler={getUserBooksHandler}
        postHandler={getPosts}
      />
      <Info showInfo={showError} severity={"info"}></Info>
      <Grid
        container
        spacing={2}
        style={{ marginTop: "20px", padding: "0 10px" }}
      >
        <Grid item xs={12} md={4} className={classes.flexCenter}>
          <table>
            <tbody>
              <tr>
                <th>Top ❤️ Books</th>
                <th>❤️</th>
              </tr>
              {topLiked.slice(0, 9).map((res, idx) => {
                return (
                  <tr key={idx}>
                    <td>{res.title}</td>
                    <td>{res.count}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Grid>
        <Grid item xs={12} md={4} className={classes.flexCenter}>
          <h1 className={classes.h1}>Search for Books</h1>
          <SearchBar handleClick={handleSearch}></SearchBar>
          {loading === true && (
            <Dimmer active>
              <Loader />
            </Dimmer>
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          {postBlogVisible && (
            <div className="white-border column-flex">
              <h3 style={{ color: "white" }}> Write about books </h3>
              <input
                style={{ width: "100%" }}
                placeholder={"Book Name"}
                value={postBlogVisible}
              ></input>
              <textarea
                style={{ width: "100%" }}
                placeholder={"Your thoughts about the book"}
                rows={10}
                onChange={(e) =>
                  setBlogData({ ...blogData, content: e.target.value })
                }
              ></textarea>
              <div
                style={{
                  background: "white",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                  padding: " 10px",
                }}
              >
                <Rating
                  name="simple-controlled"
                  defaultValue={1}
                  onChange={(event, newValue) => {
                    console.log(newValue);
                    setBlogData({ ...blogData, rating: newValue });
                  }}
                />
              </div>
              <header
                style={{ marginTop: "10px" }}
                className="header"
                onClick={() => {
                  setBlogData({
                    ...blogData,
                    title: postBlogVisible,
                    username: userName,
                  });
                  if (!blogData.title.trim() || !blogData.content.trim()) {
                    setShowError(new String("Nothing written"));
                  } else {
                    postBlog({ data: blogData }).then((res) => {
                      setPosts(res);
                      setShowError(new String("Posted Successfully "));
                    });
                  }
                }}
              >
                post
              </header>
            </div>
          )}
        </Grid>
      </Grid>
      {books.length > 0 && (
        <div>
          <Divider />
          <Filter handleFilter={handleFilter} />
          <Divider />
          <Cards
            filter={filter}
            books={books}
            setBooks={setBooks}
            isUserBooks={isUserBooks}
            setPostBlogVisible={setPostBlogVisible}
          ></Cards>
        </div>
      )}

      {posts.length > 0 && (
        <div className={classes.root}>
          <h1 className={classes.h1}> Posts. </h1>
          <Grid container spacing={2} p={1}>
            {posts.map((item, idx) => {
              return (
                <Grid
                  key={idx}
                  item
                  xs={12}
                  md={3}
                  className={classes.post}
                  onClick={() => {
                    setDialogue(true);
                    setSelectedPost({
                      id: item["_id"]["$oid"],
                      title: item.title,
                      content: item.content,
                      username: item.username,
                    });
                  }}
                >
                  <Paper
                    className={classes.paper}
                    variant="outlined"
                    style={{ height: "100%" }}
                  >
                    <h3
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.title}
                    </h3>
                    <div
                      style={{
                        width: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        marginBottom: "10px",
                      }}
                    >
                      {item.content.slice(0, 40)}
                    </div>
                    <Rating name="read-only" value={item.rating} readOnly />
                    <span>by {item.username}</span>
                  </Paper>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}

      <Dialog open={dialogue} onClose={() => setDialogue(false)}>
        <DialogTitle>{selectedPost.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{selectedPost.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          {userName === selectedPost.username && (
            <Button
              onClick={() =>
                deleteBlog({ id: selectedPost.id }).then((res) => {
                  setPosts(res);
                  setDialogue(false);
                })
              }
            >
              Delete
            </Button>
          )}
          <Button onClick={() => setDialogue(false)}>Close</Button>
        </DialogActions>
      </Dialog>

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
