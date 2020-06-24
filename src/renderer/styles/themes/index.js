import { createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import palette from './colors/palette';


const theme = createMuiTheme({
  palette,
  typography: {
    useNextVariants: true,
    fontFamily: '"Segoe UI Light", "Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 14,
    color: palette.common.fontcolor,
    button: {
      fontStyle: 'bold'
    }
  },
  mainNav: {
    iconSize: '48px'
  },
  spacedHeader: {
    letterSpacing: "8px"
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        color: palette.common.fontcolor
      }
    },
    MuiInputLabel: {
      root: {
        zIndex: 1,
        pointerEvents: 'none',
        textTransform: 'uppercase',
        paddingLeft: 8
      },
      shrink: {
        paddingLeft: 0
      }
    },
    MuiInput: {
      root: {
        backgroundColor: palette.background.darkerPaper,
        borderRadius: 1
      },
      input: {
        padding: '6px 4px 7px'
      }
    },
    MuiSelect: {
      root: {}
    },
    MuiTabs: {
      root: {
        backgroundColor: 'black'
      }
    },
    MuiTabIndicator: {
      root: {
        display: 'none'
      }
    },
    MuiTab: {
      selected: {
        backgroundColor: palette.background.paper
      }
    },
    MuiTable: {
      root: {
        borderCollapse: 'separate',
        borderSpacing: 2,
        borderColor: 'transparent'
      }
    },
    MuiTableRow: {
      root: {
        backgroundColor: palette.background.darkerPaper,

        '&:nth-child(even)': {
          backgroundColor: palette.background.default
        }
      },
      head: {
        backgroundColor: palette.background.contentFrame
      },
      hover: {
        backgroundColor: palette.common.minBlack
      }
    },
    MuiTableCell: {
      root: {},
      body: {
        fontSize: 'inherit'
      },
      head: {
        fontSize: 'inherit',
        textTransform: 'uppercase'
      }
    },
    MuiList: {
      root: {
        '& option:focus': {
          outline: 'none'
        }
      }
    },
    MuiDialog: {
      paperWidthXs: {
        minWidth: '425px',
        maxWidth: '425px'
      }
    },
    MuiDialogTitle: {
      root: {
        backgroundColor: palette.background.paper,
        letterSpacing: '4px',
        textTransform: 'uppercase'
      }
    },
    MuiDialogContent: {
      root: {
        padding: 16,
        backgroundColor: palette.background.contentFrame
      }
    },
    MuiButton: {
      root: {},
      outlined: {
        backgroundColor: palette.background.darkPaper
      },
      outlinedPrimary: {
        color: palette.common.fontcolor,
        border: `1px solid ${palette.primary.main}`
      },
      outlinedSecondary: {
        border: `1px solid ${palette.secondary.main}`
      },
      contained: {
        backgroundColor: palette.background.darkPaper,

        '&$disabled': {
          backgroundColor: palette.background.darkPaper
        }
      },
      containedPrimary: {
        backgroundColor: palette.background.darkPaper,
        color: palette.primary.main,
        border: `1px solid ${palette.primary.main}`,

        '&:hover': {
          backgroundColor: fade(palette.primary.main, 0.1)
        },

        '&$disabled': {
          borderColor: fade(palette.primary.A100, 0.3)
        }
      },
      containedSecondary: {
        backgroundColor: palette.background.darkPaper,
        color: palette.secondary.main,
        border: `1px solid ${palette.secondary.main}`,

        '&:hover': {
          backgroundColor: fade(palette.secondary.main, 0.1)
        },

        '&$disabled': {
          borderColor: fade(palette.secondary.A100, 0.3)
        }
      }
    },
    MuiTooltip: {
      tooltip: {
        fontSize: '.875em'
      }
    }
  }
});

export default theme;
