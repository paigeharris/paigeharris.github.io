import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { List, ListItem, ListItemIcon } from "@material-ui/core";

const styles = (theme) => {
    return {
      root: {
        overflow: 'hidden',
        padding: 0
      },
      navItem: {
        fontSize: '1.0rem',

        '&:hover': {
          cursor: 'pointer',
          color: theme.palette.pink['500'],
          backgroundColor: theme.palette.green['A700']
        }
      },
      navIcon: {
        display: 'block',
        color: theme.palette.pink['500'],

        '&:hover': {
          color: theme.palette.pink['600']
        }
      },
      navIconPath: {
        boxShadow: `1px 2px 8px 0 ${theme.palette.pink['A100']}`,
        borderRadius: '30px',
        padding: '3px',
        width: '1.5em',
        height: '1.5em',

        '&:hover': {
          boxShadow: `1px 2px 8px 0 ${theme.palette.pink['600']}`
        }
      }
    }
  }
;


class MainNav extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, tabs } = this.props;
    return (
      <List className={classes.root}
            open={true}>

        {tabs && tabs.map(({ label, icon: Icon }) => (
          <ListItem className={classes.navItem}
                    key={label}>
            <ListItemIcon className={classes.navIcon}>
              <Icon className={classes.navIconPath}/>
            </ListItemIcon>
            {label}
          </ListItem>
        ))
        }
      </List>
    )
  }
}

export default withStyles(styles)(MainNav);