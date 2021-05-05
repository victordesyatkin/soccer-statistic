import styled from 'styled-components';
import { rgba } from 'polished';

const colors = {
  grey: '#808488',
  lightgrey: '#dddddd',
  white: '#fff',
  black: '#000',
  lightRed: '#ffa5a5',
  blue: '#17a2b8',
  green: '#28a745',
};

const sizes = {
  xxs: '320px',
  xs: '576px',
  sm: '768px',
  md: '992px',
  lg: '1200px',
  xl: '1440px',
};

const Scrollbars = styled.div`
  &::-webkit-scrollbar {
    width: 0.4rem;
    height: 0.4rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px ${rgba(colors.black, 0.3)};
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a0a0a0;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background-clip: padding-box;
  }
`;

export { colors, sizes, Scrollbars };
