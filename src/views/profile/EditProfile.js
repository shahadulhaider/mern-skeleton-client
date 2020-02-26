import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import axios from "axios";

import axiosHeader from "../../services/api/axiosHeader";
import { MuiTextField } from "../../components/TextField";
import { getErrorText } from "../helper/error";
import { handleLoading, handleSnackbar } from "../../actions/app";
import { loadUser } from "../../actions/auth";

function EditProfile() {
  const user = useSelector(state => state.auth.user);
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const { username, email, firstname, lastname } = user;
  const [inputs, setInputs] = useState({
    username,
    email,
    firstname,
    lastname
  });

  console.log(userId, inputs);

  const handleChange = e => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  };

  const onSubmit = async profileData => {
    dispatch(handleLoading(true));
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/users/${userId}`,
        profileData,
        axiosHeader()
      );

      console.log(data);
      dispatch(
        handleSnackbar(true, "success", `You have updated your profile data`)
      );
      dispatch(loadUser());
      history.push("/auth/login");
    } catch (error) {
      const { data } = error.response;
      dispatch(handleSnackbar(true, "error", data.message));
    } finally {
      dispatch(handleLoading(false));
    }
  };

  return (
    <div className="container">
      <div className="col-md-4 mx-auto pt-5">
        <h2>Edit your profile</h2>
        <p>Please fill up the form to update your profile</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MuiTextField
            name="email"
            label="Email"
            defaultValue={inputs.email}
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
            name="username"
            label="Username"
            defaultValue={inputs.username}
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
            defaultValue={inputs.firstname}
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
            defaultValue={inputs.lastname}
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
            className="mt-3"
            type="submit"
            fullWidth
          >
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
