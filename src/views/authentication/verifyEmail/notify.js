import React from 'react';
import { VerifyContainer } from '../styles';
import verifyArt from '../../../assets/images/verify.svg';
import { useSelector } from 'react-redux';

function VerifyEmailNotify() {
  const user = useSelector(state => state.auth.user);

  return (
    <VerifyContainer>
      <div className='email-verification d-flex flex-column align-items-center justify-content-center'>
        <img src={verifyArt} alt='email verification' />
        <h4>Hello {user.name}</h4>
        <p>
          Please check your email <strong>{user.email}</strong> to verify your
          account
        </p>
      </div>
    </VerifyContainer>
  );
}
export default VerifyEmailNotify;
