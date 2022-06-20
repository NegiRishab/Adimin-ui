import React, { useState } from "react";
import classes from "./Editform.module.css";
import ReactDOM from "react-dom";

const Backdrop = () => {
  return <div className={classes.backdrop}></div>;
};

const Modal = (props) => {

  
  const[name,setname]=useState('')
  const[email,setemail]=useState('')
 const[role,setrole]=useState('')

 
const handlename=(e)=>{
setname(e.target.value)
}
const handlemail=(e)=>{
  setemail(e.target.value)
}
const handlerole=(e)=>{
  setrole(e.target.value)
}

const handlesubmit=(e)=>{
e.preventDefault()
props.submit(name,email,role);
}

  return (
    <div className={classes.modal}>
      <form className={classes.form} onSubmit={handlesubmit}>
        <h5>Name:</h5>
        <input type="text" onChange={handlename}/>
        <h5>Email:</h5>
        <input type="text" onChange={handlemail}/>
        <h5>Role:</h5>
        <input type="text"onChange={handlerole} />
        <p className={classes.submit}>
          <button type="submit">Edit Changes</button>
        </p>
      </form>
    </div>
  );
};

export default function Editform(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop />,
        document.getElementById("backlay-root")
      )}
      {ReactDOM.createPortal(
        <Modal submit={props.submit}/>,
        document.getElementById("overlay-root")
      )}
    </>
  );
}
