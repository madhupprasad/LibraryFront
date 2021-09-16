import React, { useState } from "react";
import { Select } from "semantic-ui-react";

function Filter({ handleFilter }) {
  const handleChange = (e, { value }) => {
    handleFilter(value);
  };

  const options = [
    { key: "all", value: "all", text: "ALL" },
    { key: "pdf", value: "pdf", text: "PDF" },
    { key: "mobi", value: "mobi", text: "MOBI" },
    { key: "epub", value: "epub", text: "EPUB" },
    { key: "djvu", value: "djvu", text: "DJVU" },
  ];

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Select
        placeholder="Filter by Extension..."
        onChange={handleChange}
        options={options}
      ></Select>
    </div>
  );
}

export default Filter;
