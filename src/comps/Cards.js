import React, { useContext, useState } from "react";
import { Divider, Loader } from "semantic-ui-react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import "../styles/cards.css";
import { Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { addBook, getLink, removeBook } from "../services/auth";
import { userCred } from "../Router";
import Info from "./info";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  download: {
    marginTop: "10px",
  },
  addButton: {
    marginBottom: "10px",
  },
}));

const Download = ({ item }) => {
  const { userName } = useContext(userCred);
  const [link, setLink] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const getDLink = (item) => {
    setLoading(true);
    getLink({ item })
      .then((data) => {
        console.log(data);
        if (data) {
          setLoading(false);
          setLink(data.links);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {link === false && loading === false && (
        <Button
          className={classes.download}
          variant="contained"
          color="primary"
          onClick={() => getDLink(item)}
        >
          Get
        </Button>
      )}

      {loading && <Loader active inline="centered" />}

      {link && (
        <div>
          <Divider></Divider>
          <div
            className="linkContainer"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <a href={link["IPFS.io"]} target="_blank" download>
              IPFS.io
            </a>
            <a href={link["Cloudflare"]} target="_blank" download>
              Cloudflare
            </a>
            <a href={link["Infura"]} target="_blank" download>
              Infura
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export const Cards = ({
  books,
  filter,
  isUserBooks,
  setBooks,
  setPostBlogVisible,
}) => {
  const classes = useStyles();
  const { userName } = useContext(userCred);
  const [info, setInfo] = useState("");

  const handleAdd = (item) => {
    addBook({ item, userName }).then((res) => {
      setInfo(new String(res?.msg));
    });
  };

  const handleRemove = (item) => {
    removeBook({ item, userName }).then((res) => {
      setInfo(new String(res?.msg));
      setBooks(res?.data);
    });
  };

  const bookslist = books.map((item) => {
    if (item["Extension"] === filter || filter === "all") {
      function extColor(ext) {
        switch (ext) {
          case "pdf":
            return "red";
          case "djvu":
            return "yellow";
          case "epub":
            return "blue";
          case "mobi":
            return "cyan";
          default:
            return "black";
        }
      }

      return (
        <Grid key={item.ID} item xs={12} md={3}>
          <Paper
            className={classes.paper}
            variant="outlined"
            style={{ height: "100%" }}
          >
            <div className={classes.addButton}>
              {isUserBooks ? (
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={() => handleRemove(item)}
                >
                  ❤️
                </Button>
              ) : (
                <Button variant="outlined" onClick={() => handleAdd(item)}>
                  ❤️
                </Button>
              )}
            </div>
            <b>{item.Title.slice(0, 50)}...</b>
            <div style={{ color: extColor(item.Extension) }}>
              {item.Extension}
            </div>
            <div>{item.Author}</div>
            <div>
              <Download item={item} />
              <Button
                className={classes.download}
                variant="contained"
                color="primary"
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  setPostBlogVisible(item.Title);
                }}
              >
                Post
              </Button>
            </div>
          </Paper>
        </Grid>
      );
    }
  });

  return (
    <div className={classes.root}>
      <Info showInfo={info} severity={"success"} />
      {isUserBooks && (
        <header className="header" style={{ marginBottom: "10px" }}>
          {userName}'s ❤️ Books
        </header>
      )}
      <Grid container spacing={3}>
        {bookslist}
      </Grid>
    </div>
  );
};
