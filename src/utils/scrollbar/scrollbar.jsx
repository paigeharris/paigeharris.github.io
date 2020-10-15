import { background } from '../../../../styles/theme/colors/background';

export const scrollbar = (style) => {
  style = style && (typeof style === 'object') ? style : {};

  return Object.assign({
    overflow: 'auto',

    '&::-webkit-scrollbar': {
      width: 16,
      height: 16,
      backgroundColor: background.paper,
      borderTop: `1px solid #393939`,
      borderBottom: `1px solid #393939`,
      borderLeft: `1px solid #393939`
    },

    '&::-webkit-scrollbar-thumb': {
      background: background.contentFrame,
      borderLeft: `1px solid ${background.paper}`
    }
  }, style);
};