import React from "react";
import { Card } from "semantic-ui-react";

export const Cards = ({ books }) => {
  const bookslist = books.map((item) => {
    return (
      <Card
        target="_blank"
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
