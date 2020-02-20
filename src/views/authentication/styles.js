import styled from "styled-components";

export const FormContainer = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90vh;

  .form-card {
    width: 100%;
    display: flex;
  }

  .form-intro {
    text-align: center;
    color: ${props => props.theme.fontBlack};
    img {
      max-width: 330px;
    }
  }

  .form {
    box-shadow: 0 0 8px 6px rgba(0, 0, 0, 0.1);
    flex-grow: 1;
    height: 100%;
    border-radius: 12px;
    padding: 2em 1.8em;
    max-width: 420px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h2 {
      margin: 0 0 12px 0;
    }
    .btn {
      margin-top: 12px;
    }

    .forgot-pass {
      text-align: right;
      font-size: 0.9rem;
      color: ${props => props.theme.primary};
    }
  }

  @media (max-width: ${props => props.theme.screens.large}) {
    .form-intro {
      img {
        width: 250px;
      }
    }
  }
  @media (max-width: ${props => props.theme.screens.medium}) {
    .form-intro {
      img {
        display: none;
      }
    }
  }
`;

export const VerifyContainer = styled.div`
  .email-verification {
    width: 100%;
    height: 100vh;
  }
  p {
    font-size: 1.1em;
  }
  img {
    max-width: 360px;
    padding: 1em 0.6em;
  }
`;
