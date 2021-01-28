import React from 'react'
import { makeStyles, withStyles } from "@material-ui/core";

// withStyles or makeStyles converts JSS JSON object to pure css in components its invoked
// JSS is letting us define css with JSON
const style = {
    sideMenu: {
        display: 'flex',
        flexDirection: 'column',
        position: 'absolute',
        left: '0px',
        width: '320px',
        height: '100%',
        backgroundColor: '#253053'
    }
}

const SideMenu = (props) => {
    const { classes } = props;
    return (
        <div className={classes.sideMenu}>
        </div>
    )
}

export default withStyles(style)(SideMenu);
