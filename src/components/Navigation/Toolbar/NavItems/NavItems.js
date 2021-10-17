import React from "react";
import NavItem from "./NavItem/NavItem";

import classes from "./NavItems.module.css";

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem link="/" exact>
      Build Burger
    </NavItem>
    { props.isAuth ? <NavItem link="/orders">Orders</NavItem> : null }
    {!props.isAuth ? (
      <NavItem link="/auth">Auth</NavItem>
    ) : (
      <NavItem link="/logout">Logout</NavItem>
    )}
  </ul>
);

export default navItems;
