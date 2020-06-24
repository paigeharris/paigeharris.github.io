import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => {
  return {
    root: {}
  }
};

class Main extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        Henlo World
      </div>
    )
  }
}

export default withStyles(styles)(Main);