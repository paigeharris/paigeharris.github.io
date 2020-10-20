import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";
import {
  AccountTree,
  ChevronLeft,
  ChevronRight,
  ContactMail,
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
      '& div': {
        maxWidth: 175,
        overflow: 'visible'
      }
    },
    toggleButton: {
      backgroundColor: theme.palette.pink["500"],

      '&:hover': {
        backgroundColor: theme.palette.pink["900"]
      }
    },
    heard: {
      padding: 8
    },
    dawg: {
      width: '90%'
    },
    footer: {
      border: 'none'
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
          <Typography className={classes.heard}
                      variant={'h4'}
          >
            I heard you were looking for a developer (W.I.P this site is currently under reconstruction 🐸🚯) ..
          </Typography>
          <img className={classes.dawg}
               src={'https://media.giphy.com/media/ayQ99hp01HFN6/source.gif'}
               alt={'Gif'}
               onClick={this.props.sayHi}
          />

          {/*nonesense below*/}
          <div>
            {this.props.his &&
            this.props.his.map((hi, index) => (
              <p onClick={this.props.sayHi}
                 key={index}
                 style={{ display: "inline" }}
              >
                {`${hi} `}
              </p>
            ))
            }
          </div>
          {/* end of nonsense */}
        </Content>
        <Footer className={classes.footer}>
        </Footer>
      </Root>
    )
  }
}

export default withStyles(styles)(Main);