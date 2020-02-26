import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { AllInclusive, Menu } from "mdi-material-ui";

import { handleDrawer } from "../../actions/app";
import { logout } from "../../actions/auth";
import { GuestLinks, UserLinks } from "./nav/Links";
import { HeaderContainer } from "./styles";

function Header() {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  return (
    <HeaderContainer>
      <AppBar position="static">
        <Toolbar>
          <Typography variantt="h6">
            <Link to="/">
              <AllInclusive /> Image<span>Logo</span>
            </Link>
          </Typography>
          <div className="header-btns">
            {isAuthenticated ? (
              <UserLinks user={user} logout={() => dispatch(logout())} />
            ) : (
              <GuestLinks />
            )}
          </div>
          <div className="mobile-menu">
            <IconButton onClick={() => dispatch(handleDrawer(true))}>
              <Menu style={{ width: 20 }} />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </HeaderContainer>
  );
}

export default Header;
