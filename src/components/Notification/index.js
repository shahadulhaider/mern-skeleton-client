import React from "react";
import { useSelector, useDispatch } from "react-redux";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { Close } from "mdi-material-ui";

import { colors } from "../../theme/constants";
import { handleSnackbar } from "../../actions/app";

function Notification() {
  const snackbar = useSelector(state => state.app.snackbar);
  const dispatch = useDispatch();

  const bgcolor = snackbar.type === "error" ? colors.error : colors.success;

  const handleClose = () => {
    dispatch(handleSnackbar(false, snackbar.type, snackbar.message));
  };

  return (
    <Snackbar
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <SnackbarContent
        style={{ backgroundColor: bgcolor }}
        message={<span id="message">{snackbar.message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <Close />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
}

export default Notification;
