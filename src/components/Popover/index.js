import React, { useState } from "react";
import Popover from "@material-ui/core/Popover";
import Tooltip from "@material-ui/core/Tooltip";
import { PopoverContainer } from "./styles";

function MuiPopover({
  children,
  tooltip = null,
  trigger: Trigger,
  triggerContent
}) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      {tooltip ? (
        <Tooltip title={tooltip}>
          <Trigger onClick={handleClick}>{triggerContent}</Trigger>
        </Tooltip>
      ) : (
        <Trigger onClick={handleClick}>{triggerContent}</Trigger>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <PopoverContainer onClick={handleClose}>{children}</PopoverContainer>
      </Popover>
    </>
  );
}

export default MuiPopover;
