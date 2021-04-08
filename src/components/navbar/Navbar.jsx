import React from 'react';
import {Toolbar,IconButton,Badge,MenuItem,Menu,Typography,AppBar} from '@material-ui/core';
import {ShoppingCart} from '@material-ui/icons';
import useStyles from './Styles';
import logo from '../../assets/commerce.png';
const Navbar = () => {
    const classes = useStyles();
    return (
        <div>
            <AppBar position='fixed' className={classes.appBar} color="inherit">
                <Toolbar>
                    <Typography variant="h6" className={classes.title} color="inherit">
                        <img src={logo} alt="commerce.js" height="25px" className={classes.image}/>
                        Commerce.js
                    </Typography>
                    <div className={classes.grow}/>
                    <div className={classes.button} >
                        <IconButton aria-label="Show Cart items" color="inherit">
                            <Badge badgeContent={2} color="secondary">
                                <ShoppingCart></ShoppingCart>
                            </Badge>
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar
