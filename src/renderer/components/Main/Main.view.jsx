import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import { ChevronLeft, ChevronRight, MenuRounded } from '@material-ui/icons';
import {
  Root,
  Header,
  Nav,
  Content,
  Footer,
  presets
} from 'mui-layout';
import { Typography } from "@material-ui/core";

const styles = (theme) => {
  return {
    root: {},
    header: {
      backgroundColor: theme.palette.pink["500"],
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)',
      borderColor: 'rgba(0,0,0,0.12)',
      borderRadius: 3
    },
    toggleButton: {
      backgroundColor: theme.palette.pink["500"],
      '&:hover': {
        backgroundColor: theme.palette.pink["900"]
      }
    }
  }
};

const config = presets.createStandardLayout();

class Main extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const { classes } = this.props;
    return (
      <Root config={config}>
        <Header
          classes={{
            root: classes.header
          }}
          renderMenuIcon={open => (open ? <ChevronLeft/> : <MenuRounded/>)}
        >
          <Typography>
            Paige's Projects
          </Typography>
        </Header>
        <Nav
          renderIcon={collapsed =>
            collapsed ? <ChevronRight/> : <ChevronLeft/>
          }
          toggleProps={{
            classes: {
              root: classes.toggleButton
            }
          }}
        >
          <Typography>
            Nav
          </Typography>
        </Nav>
        <Content>
          <Typography>
            Content
          </Typography>
        </Content>
        <Footer>
          <Typography>
            Footer
          </Typography>
        </Footer>
      </Root>
    )
  }
}

export default withStyles(styles)(Main);