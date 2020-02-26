import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { MuiTextField } from '../../../components/TextField';
import { resetUserPassword } from '../../../actions/auth';
import { getErrorText } from '../../helper/error';

function ResetPassword() {
  const { resetToken } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, watch } = useForm();

  const [inputs, setInputs] = useState({ password: '', confirmPassword: '' });

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async data => {
    await dispatch(
      resetUserPassword({
        password: data.password,
        resetToken,
      }),
    );
    history.push('/auth/login');
  };

  return (
    <div className='container'>
      <div className='col-md-4 mx-auto pt-5'>
        <h2>Reset Your Password</h2>
        <p>Please enter the new password</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MuiTextField
            name='password'
            label='New Password'
            onChange={handleSubmit(onSubmit)}
            margin='dense'
            type='password'
            variant='outlined'
            fullWidth
            inputRef={register({
              required: 'Password is required',
              minLength: 8,
              maxLength: 30,
              pattern: {
                value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}/,
                message: 'Invalid password',
              },
            })}
            error={!!(errors && errors.password)}
            helperText={getErrorText(errors, 'password')}
          />
          <MuiTextField
            name='confirmPassword'
            label='Confirm Password'
            onChange={handleChange}
            margin='dense'
            type='password'
            variant='outlined'
            fullWidth
            inputRef={register({
              required: 'Confirm Password',
              validate: val => {
                return val !== watch('password')
                  ? 'Passwrod does not match'
                  : true;
              },
            })}
            error={!!(errors && errors.confirmPassword)}
            helperText={getErrorText(errors, 'confirmPassword')}
          />
          <Button
            variant='contained'
            color='primary'
            className='mt-3'
            type='submit'
            fullWidth>
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
