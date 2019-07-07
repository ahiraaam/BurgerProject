import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import BackDrop from '../../UI/Backdrop/Backdrop';
import classes from './SideDrawer.css'
const sideDrawer  = (props) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    // dif css classes for animations
    return(
        <React.Fragment>
            <BackDrop show={props.open} clicked = {props.closed}/>
            <div className={attachedClasses.join(' ')}> 
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems></NavigationItems>
                </nav>
            </div>
        </React.Fragment>
        
    )
}

export default sideDrawer;