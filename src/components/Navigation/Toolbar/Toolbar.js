import React from 'react';
import Logo from '../../Logo/Logo';
import NavItems from './NavItems/NavItems';
import Menu from '../SideDrawer/Menu/Menu';

import classes from './Toolbar.module.css'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <Menu clicked={props.menuClicked} />
        <div className={classes.Logo}>
        <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavItems isAuth={props.isAuth} />
        </nav>
    </header>
);

export default toolbar; 