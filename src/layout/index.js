import React from 'react';
import { ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import Header from '../components/Header';
import MuiDrawer from '../components/Drawer';
import Loading from '../components/Loading';
import Notification from '../components/Notification';

import MuiTheme from '../theme/mui';
import StyledTheme from '../theme/styled';
import GlobalStyles from '../theme/styles/globalStyles';

function Layout({ children }) {
  return (
    <MuiThemeProvider theme={MuiTheme}>
      <StyledThemeProvider theme={StyledTheme}>
        <GlobalStyles />

        <Header />

        {children}

        <Loading />
        <MuiDrawer />
        <Notification />
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}

export default Layout;
