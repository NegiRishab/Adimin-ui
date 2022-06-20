import React, { useState } from "react";
import Editform from "./Editform";
import classes from "./Editing.module.css";

export default function Editing(props) {
  const [Formactive, setFormactive] = useState(false);
  // const{id}=props.id;
  

  const handleupdate = () => {
    setFormactive(true);
  };
  const submit =(n,e,r) => {
    setFormactive(false);
    props.submit(n,e,r,props.id);
  };
       
      
 const handledelte=()=>{
   props.deleteItem(props.id);
 }
 

  return (
    <div>
      {Formactive && <Editform submit={submit}  />}
      <div className={classes.edit}>
        <div onClick={handleupdate}>
          <i className="fas fa-edit"></i>
        </div>
        <div onClick={handledelte}>
          <i className="fas fa-trash-alt"></i>
        </div>
      </div>
    </div>
  );
}
