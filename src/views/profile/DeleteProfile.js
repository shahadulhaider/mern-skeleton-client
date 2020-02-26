import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Redirect } from "react-router-dom";
import { TrashCan } from "mdi-material-ui";

import axiosHeader from "../../services/api/axiosHeader";
import { logout } from "../../actions/auth";
import { handleLoading, handleSnackbar } from "../../actions/app";

function DeleteProfile({ userId }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const deleteAccount = async () => {
    dispatch(handleLoading(true));
    try {
      const { data } = await axios.delete(
        `http://localhost:5000/api/users/${userId}`,
        axiosHeader()
      );
      console.log(data);
      dispatch(logout());
      dispatch(
        handleSnackbar(true, "success", "Your profiles has been removed.")
      );
      setRedirect(true);
    } catch (error) {
      const { data } = error.response;
      dispatch(handleSnackbar(true, "error", data.message));
    } finally {
      dispatch(handleLoading(false));
    }
  };
  const handleRequestClose = () => {
    setOpen(false);
  };

  if (redirect) {
    return <Redirect to="/" />;
  }

  return (
    <span>
      <Tooltip title="Delete profile">
        <IconButton onClick={handleClick}>
          <TrashCan style={{ fill: "#bb321f" }} />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>Confirm to delete your account.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={deleteAccount}
            color="secondary"
            autoFocus="autoFocus"
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
}

export default DeleteProfile;
