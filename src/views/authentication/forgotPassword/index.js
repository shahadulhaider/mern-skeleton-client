import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";

import { MuiTextField } from "../../../components/TextField";
import { sendForgotPasswordInfo } from "../../../actions/auth";

function ForgotPassword({ history }) {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleChange = e => {
    setEmail(e.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await dispatch(sendForgotPasswordInfo(email));
    history.push("/auth/login");
  };

  return (
    <div className="container">
      <div className="col-md-4 mx-auto pt-5">
        <h2>Forgot your password?</h2>
        <p>Please enter your email used for registration.</p>
        <form onSubmit={handleSubmit}>
          <MuiTextField
            name="email"
            label="Email"
            value={email}
            onChange={handleChange}
            margin="dense"
            type="email"
            variant="outlined"
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            className="mt-3"
            type="submit"
            fullWidth
          >
            Send Instructions
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
