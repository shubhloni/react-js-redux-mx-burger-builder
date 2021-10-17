import React from "react";

import classes from './Backdrop.module.css';

const backDrop = (props) => (
  props.show ? <div 
  className={classes.BackDrop}
  onClick={props.backDropClicked}></div> : null
);

export default backDrop;
