import React, { useState } from "react";
import Editing from "./Editing";
import classes from "./ListItem.module.css";

export default function ListItem(props) {
  
  const DelteItem = (id) => {
    props.delete(id);
  };

  const handlecheckbox = () => {
    //  check=!check;
    props.checkbox(props.item.id);
  };
  const handlesubmit = (n, e, r, id) => {
    props.submit(n, e, r, id);
  };

  return (
    <div className={props.item.ischecked?classes.rowwhite:classes.row}>
      <div className={classes.column}>
        <p>
          <input
            type="checkbox"
            size="4"
            defaultChecked={props.item.ischecked}
            onClick={handlecheckbox}
            // style={{props.item.ischecked ?}}
          />
        </p>
        <p>{props.item.name} </p>
        <p>{props.item.email} </p>
        <p>{props.item.role} </p>
        <p>
          <Editing
            deleteItem={DelteItem}
            id={props.item.id}
            submit={handlesubmit}
          />
        </p>
      </div>
    </div>
  );
}
