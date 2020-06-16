import React from 'react';
import { IconButton, Grid, Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import Icon from '@material-ui/icons/LocationOnSharp';

const useStyles = makeStyles(theme => ({
    avatar: { // this is the icon background color
        backgroundColor: theme.palette.primary.main,
        //56
        height: 50,
        width: 50
    },
    icon: {
        //32
        height: 25,
        width: 25
    },
}));

const CustomControl = (props) => {
    const classes = useStyles();
    const { color, variant, onClick, buttonText } = props
    return (
        <IconButton
            onClick={onClick}
        >
            <Avatar className={classes.avatar}>
                <Icon className={classes.icon} />
            </Avatar>
        </IconButton>
    );
}


export default CustomControl