import React from "react";
import Auxz from "../../../hoc/Auxz/Auxz";
import Logo from "../../Logo/Logo";
import NavItems from "../Toolbar/NavItems/NavItems";
import BackDrop from "../../UI/Backdrop/Backdrop";

import classes from "./SideDrawer.module.css";

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
  return (
    <Auxz>
      <BackDrop show={props.open} backDropClicked={props.closed}/>
      <div className={attachedClasses.join(' ')} onClick={props.close}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavItems isAuth={props.isAuth}/>
        </nav>
      </div>
    </Auxz>
  );
};

export default sideDrawer;
