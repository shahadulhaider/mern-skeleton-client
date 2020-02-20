import styled from "styled-components";

export const PopoverContainer = styled.div`
  .logout {
    color: ${props => props.theme.error};
    svg {
      fill: ${props => props.theme.error};
    }
  }
  .btn {
    width: 100%;
  }
  .block {
    display: block;
  }
`;
