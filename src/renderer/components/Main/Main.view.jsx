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
    root: {}
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
          renderMenuIcon={open => (open ? <ChevronLeft/> : <MenuRounded/>)}
        >
          <Typography>
            Header
          </Typography>
        </Header>
        <Nav
          renderIcon={collapsed =>
            collapsed ? <ChevronRight/> : <ChevronLeft/>
          }
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