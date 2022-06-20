import React from "react";
import { useState } from "react";
import classes from "./Header.module.css";

export default function Header(props) {
  const [searchContent, setSearchContent] = useState("");

  const handlechange = (e) => {
    // console.log(e.target.value);
    setSearchContent(e.target.value);
  };

  const handleSearch = () => {
    if (searchContent === "") {
      return;
    }
    props.search(searchContent);
  };

  return (
    <div className={classes.nav}>
      <div className={classes.logo}>
        <h1>Admin Ui</h1>
      </div>
      <div className={classes.input}>
        <input
          type="text"
          placeholder="Search by using name,email or role"
          onChange={handlechange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}
