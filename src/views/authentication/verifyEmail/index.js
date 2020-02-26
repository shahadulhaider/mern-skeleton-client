import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { verifyEmailFromToken } from '../../../actions/auth';
import { VerifyContainer } from '../styles';
import verifyArt from '../../../assets/images/verify.svg';

function VerifyEmail() {
  const { token } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    (async () => {
      await dispatch(verifyEmailFromToken(token));
      history.push('/auth/login');
    })();
  }, [dispatch, history, token]);

  return (
    <VerifyContainer>
      <div className='email-verification d-flex flex-column align-items-center justify-content-center'>
        <img src={verifyArt} alt='email verification' />
        <h2>Please wait</h2>
        <p>
          Verifying token{' '}
          <small>
            <code>{token}</code>
          </small>
        </p>
      </div>
    </VerifyContainer>
  );
}

export default VerifyEmail;
