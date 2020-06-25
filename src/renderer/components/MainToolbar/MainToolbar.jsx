import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon } from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import { DeveloperMode } from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";

const styles = (theme) => {
  return {
    root: {
      overflow: 'hidden',
      padding: 0
    }
  }
};


class MainToolbar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, tabs } = this.props;
    return (
      <Toolbar>
        <IconButton edge="start" aria-label="menu">
          <DeveloperMode/>
          <Typography>
            Paige's Projects
          </Typography>
        </IconButton>
      </Toolbar>
    )
  }
}

export default withStyles(styles)(MainToolbar);