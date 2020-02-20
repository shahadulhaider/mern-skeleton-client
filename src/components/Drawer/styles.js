import styled from "styled-components";

export const DrawerContainer = styled.div`
  width: 270px;
  box-sizing: border-box;
  padding: 1em 0.9em;
  background-color: rgba(0, 0, 0, 0);
  color: ${props => props.theme.fontBlack};

  a {
    border-radius: 6px;
    svg {
      margin-right: 6px;
    }

    &:hover {
      cursor: pointer;
    }
    &:active,
    &:focus {
      color: ${props => props.theme.primary};
    }
  }

  .active {
    background-color: rgba(0, 0, 0, 0.1);
    color: ${props => props.theme.primary};
  }

  .logout-nav-btn {
    color: rgba(200, 0, 0, 0.8);
  }
`;
