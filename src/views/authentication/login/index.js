import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Button from '@material-ui/core/Button';

import { login } from '../../../actions/auth';
import { MuiTextField } from '../../../components/TextField';
import { FormContainer } from '../styles';
import { getErrorText } from '../../helper/error';

function Login() {
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = data => {
    dispatch(login(data));
  };

  return (
    <FormContainer>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6'>
            <div className='form-intro'>
              <img
                src={require('../../../assets/images/login.svg')}
                alt='Login'
              />
              <h2>Hello There</h2>
              <p>
                If you don't have an account yet, <br /> please register here.
              </p>
              <Button
                color='secondary'
                variant='outlined'
                to='/auth/register'
                component={Link}>
                Register an Account
              </Button>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='form'>
              <h2>Login</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MuiTextField
                  name='email'
                  label='Email'
                  onChange={handleChange}
                  margin='dense'
                  variant='outlined'
                  fullWidth
                  inputRef={register({
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  error={!!(errors && errors.email)}
                  helperText={getErrorText(errors, 'email')}
                />
                <MuiTextField
                  name='password'
                  label='Password'
                  onChange={handleChange}
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
                <div className='mt-2 mb-3 forgot-pass'>
                  <Link to='/auth/forgotpassword'>Forgot Password?</Link>
                </div>
                <Button
                  variant='contained'
                  color='primary'
                  className='btn'
                  type='submit'
                  fullWidth>
                  Login
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}

export default Login;
