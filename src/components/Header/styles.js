import styled from "styled-components";

export const HeaderContainer = styled.div`
  p {
    flex-grow: 1;
    font-weight: 400;
    svg {
      width: 40px;
      margin-bottom: -4.5px;
    }
    span {
      font-weight: 700;
    }
  }
  button {
    color: ${props => props.theme.fontWhite};
    svg {
      margin-right: 4px;
    }
  }
  .mobile-menu {
    display: none;
  }
  .header-btns {
    img {
      border-radius: 50%;
      width: 30px;
    }
  }

  @media (max-width: ${props => props.theme.screens.extraSmall}) {
    .header-btns {
      display: none;
    }
    .mobile-menu {
      display: block;
    }
  }
`;
