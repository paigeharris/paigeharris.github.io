import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  AccountTree,
  ChevronLeft,
  ChevronRight,
  ContactMail,
  DeveloperMode,
  EmojiPeople,
  Equalizer,
  Home,
  MenuRounded
} from '@material-ui/icons';
import {
  Root,
  Header,
  Nav,
  Content,
  Footer,
  presets
} from 'mui-layout';
import { Typography } from "@material-ui/core";
import MainNav from "../MainNav";
import MainToolbar from "../MainToolbar";

const styles = (theme) => {
  return {
    root: {
      overflow: 'hidden'

    },
    content: {
      overflow: 'hidden',
      width: 600
    },
    header: {
      fontFamily: 'Marker Felt',
      backgroundColor: theme.palette.pink["500"],
      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.12)',
      borderColor: 'rgba(0,0,0,0.12)',
      borderRadius: 3
    },
    nav: {
      maxWidth: 200,
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
    this.tabs = [
      {
        label: 'Home',
        icon: Home
      },
      {
        label: 'Projects',
        icon: AccountTree
      },
      {
        label: 'Skills',
        icon: Equalizer
      },
      {
        label: 'About Me',
        icon: EmojiPeople
      },
      {
        label: 'Contact Me',
        icon: ContactMail
      }
    ];

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
          <MainToolbar/>
        </Header>
        <Nav className={classes.nav}
             renderIcon={collapsed =>
            collapsed ? <ChevronRight/> : <ChevronLeft/>
          }
             toggleProps={{
            classes: {
              root: classes.toggleButton
            }
          }}
        >
          <MainNav tabs={this.tabs}/>
        </Nav>
        <Content className={classes.content}>
          <img src={'https://media.giphy.com/media/ayQ99hp01HFN6/source.gif'} alt={'Gif'}/>
          <Typography color="textSecondary">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam
            aliquam sem et tortor consequat id porta. Adipiscing commodo elit
            at imperdiet. Lacus sed turpis tincidunt id aliquet risus feugiat
            in ante. Cras tincidunt lobortis feugiat vivamus at augue eget
            arcu. Hendrerit dolor magna eget est. Fames ac turpis egestas
            maecenas. Cras semper auctor neque vitae tempus quam pellentesque.
            Amet nisl purus in mollis nunc sed id semper. Molestie ac feugiat
            sed lectus vestibulum mattis ullamcorper velit sed. Id aliquet
            lectus proin nibh nisl condimentum.
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