import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton'; 
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const styles = {
  root: {
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
}; 

function ButtonAppBar(props) {
  const { classes, nameDisplay } = props; 
  let loginInfo;
  console.log("DISPLAY NAME IS::: " + nameDisplay )

  if (nameDisplay !== ""){
      loginInfo = <Button color="inherit" onClick={() => props.logout()}> {nameDisplay} - LOGOUT </Button>
  } else {
      loginInfo =  <LoginModal /> 
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"> 
          </IconButton>
          <Typography variant="title" color="inherit" style={ {cursor: "pointer"  } } className={classes.flex} onClick={() => props.handleBackButton()}>
            My Recipebook
          </Typography>   
          {nameDisplay === "" ? <RegisterModal/> : null }
          { loginInfo }
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default withStyles(styles)(ButtonAppBar); 