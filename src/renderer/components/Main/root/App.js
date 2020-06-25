import React from 'react';
import Main from '../Main.view';
import { withStyles } from "@material-ui/core";

const styles = (theme) => {
  return {
    root: {
      overflow: 'hidden',
      height: '100vh',
      width: '100vw',

      '& button': {
        background: theme.palette.pink["500"],

        '&:hover': {
          background: theme.palette.green['A700']
        }
      }
    }
  }
};

function App(props) {

  return (
    <div className={props.classes.root}>
      <Main/>
    </div>
  );
}

export default withStyles(styles)(App);
