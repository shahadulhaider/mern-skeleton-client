import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${props => props.theme.fonts.primary};
  }
  a {
    text-decoration: none;
    color: inherit;
  }
`;
