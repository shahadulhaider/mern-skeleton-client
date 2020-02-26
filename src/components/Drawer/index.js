import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import {
  AccountPlus,
  LoginVariant,
  Logout,
  MonitorDashboard,
} from 'mdi-material-ui';

import { handleDrawer } from '../../actions/app';
import { logout } from '../../actions/auth';
import { getNavClassNames, ListItemButton, ListItemLink } from './helper';
import { DrawerContainer } from './styles';

function MuiDrawer() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const drawerOpen = useSelector(state => state.app.drawerOpen);
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const closeDrawer = () => dispatch(handleDrawer(false));

  return (
    <Drawer anchor='right' open={drawerOpen} onClick={closeDrawer}>
      <DrawerContainer
        role='presentation'
        onClick={closeDrawer}
        onKeyDown={closeDrawer}>
        <List component='div'>
          {isAuthenticated ? (
            <>
              <ListItemLink
                className={getNavClassNames('/dashboard', pathname)}
                to='/dashboard'>
                <MonitorDashboard />
                Dashboard
              </ListItemLink>
              <ListItemButton
                className='logout-nav-btn'
                onClick={() => dispatch(logout())}>
                <Logout />
                Logout
              </ListItemButton>
            </>
          ) : (
            <>
              <ListItemLink
                className={getNavClassNames('/auth/login', pathname)}
                to='/auth/login'>
                <LoginVariant />
                Login
              </ListItemLink>
              <ListItemLink
                className={getNavClassNames('/auth/register', pathname)}
                to='/auth/register'>
                <AccountPlus />
                Signup
              </ListItemLink>
            </>
          )}
        </List>
      </DrawerContainer>
    </Drawer>
  );
}

export default MuiDrawer;
