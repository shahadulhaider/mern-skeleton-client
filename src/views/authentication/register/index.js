import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Button from "@material-ui/core/Button";

import { MuiTextField } from "../../../components/TextField";
import { FormContainer } from "../styles";
import { getErrorText } from "../../helper/error";
import { registerNewUser } from "../../../actions/auth";

function Register({ history }) {
  const { register, handleSubmit, errors, watch } = useForm();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    firstname: "",
    lastname: ""
  });

  const handleChange = e => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmit = async data => {
    await dispatch(registerNewUser(data));
    history.push("/auth/verifyemail");
  };

  return (
    <FormContainer>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="form-intro">
              <img
                src={require("../../../assets/images/register.svg")}
                alt="Register"
              />
              <h2>Create a new account</h2>
              <p>
                Already have an account? <br /> Please Login to your account.
              </p>
              <Button
                color="secondary"
                variant="outlined"
                to="/auth/login"
                component={Link}
              >
                Login
              </Button>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form">
              <h2>Register</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <MuiTextField
                  name="email"
                  label="Email"
                  onChange={handleChange}
                  margin="dense"
                  type="email"
                  variant="outlined"
                  fullWidth
                  inputRef={register({
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  error={!!(errors && errors.email)}
                  helperText={getErrorText(errors, "email")}
                />
                <MuiTextField
                  name="password"
                  label="Password"
                  onChange={handleChange}
                  margin="dense"
                  type="password"
                  variant="outlined"
                  fullWidth
                  inputRef={register({
                    required: "Password is required",
                    minLength: 8,
                    maxLength: 30,
                    pattern: {
                      value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}/,
                      message: "Invalid password"
                    }
                  })}
                  error={!!(errors && errors.password)}
                  helperText={getErrorText(errors, "password")}
                />
                <MuiTextField
                  name="confirmPassword"
                  label="Confirm Password"
                  onChange={handleChange}
                  margin="dense"
                  type="password"
                  variant="outlined"
                  fullWidth
                  inputRef={register({
                    required: "Confirm Password",
                    validate: val => {
                      return val !== watch("password")
                        ? "Password does not match"
                        : true;
                    }
                  })}
                  error={!!(errors && errors.confirmPassword)}
                  helperText={getErrorText(errors, "confirmPassword")}
                />
                <MuiTextField
                  name="username"
                  label="Username"
                  onChange={handleChange}
                  margin="dense"
                  type="text"
                  variant="outlined"
                  fullWidth
                  inputRef={register({
                    required: "username is required",
                    minLength: 4,
                    maxLength: 30
                  })}
                  error={!!(errors && errors.username)}
                  helperText={getErrorText(errors, "username")}
                />
                <MuiTextField
                  name="firstname"
                  label="First Name"
                  onChange={handleChange}
                  margin="dense"
                  type="text"
                  variant="outlined"
                  fullWidth
                  inputRef={register({ required: "firstname is required" })}
                  error={!!(errors && errors.firstname)}
                  helperText={getErrorText(errors, "firstname")}
                />
                <MuiTextField
                  name="lastname"
                  label="Last Name"
                  onChange={handleChange}
                  margin="dense"
                  type="text"
                  variant="outlined"
                  fullWidth
                  inputRef={register({ required: "lastname is required" })}
                  error={!!(errors && errors.lastname)}
                  helperText={getErrorText(errors, "lastname")}
                />
                <Button
                  variant="contained"
                  color="primary"
                  className="btn"
                  type="submit"
                  fullWidth
                >
                  Create Account
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </FormContainer>
  );
}

export default Register;
