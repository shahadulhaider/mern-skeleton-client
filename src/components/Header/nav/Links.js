import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import {
  LoginVariant,
  AccountPlus,
  MonitorDashboard,
  Logout,
  BellOutline
} from "mdi-material-ui";

import MuiPopover from "../../Popover";

export function GuestLinks() {
  return (
    <>
      <Link to="/auth/login">
        <Button>
          <LoginVariant /> Login
        </Button>
      </Link>
      <Link to="/auth/register">
        <Button>
          <AccountPlus /> Signup
        </Button>
      </Link>
    </>
  );
}

export function UserLinks({ logout, user }) {
  return (
    <>
      <Link to="/dashboard">
        <Tooltip title="Dashboard">
          <IconButton>
            <MonitorDashboard />
          </IconButton>
        </Tooltip>
      </Link>

      <MuiPopover
        trigger={IconButton}
        triggerContent={<BellOutline />}
        tooltip="Notifications"
      >
        <p className="p-3">No Notifications</p>
      </MuiPopover>
      <MuiPopover
        trigger={IconButton}
        triggerContent={<img src={user.profilePicture} alt={user.username} />}
        tooltip={user.username}
      >
        <Button component={Link} className="btn block" to="/dashboard">
          <ListItem>
            <ListItemIcon>
              <MonitorDashboard />
            </ListItemIcon>
            Dashboard
          </ListItem>
        </Button>
        <Button onClick={logout} className="btn">
          <ListItem className="logout">
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Logout
          </ListItem>
        </Button>
      </MuiPopover>
    </>
  );
}
