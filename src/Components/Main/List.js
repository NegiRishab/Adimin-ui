import React from 'react'
import classes from './List.module.css'
export default function List(props) {
  return (
    <div className={classes.row}>
      <div className={classes.column}>
        <p > <input type="checkbox" onClick={props.selectall} checked={props.checkbox} /></p>
        <p>Name </p>
        <p>Email </p>
        <p>Role </p>
        <p>Action </p>
      </div>
    </div>
  )
}

