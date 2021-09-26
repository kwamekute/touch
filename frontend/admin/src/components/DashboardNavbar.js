import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AppBar, Box, Hidden, IconButton, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './Logo';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  return (
    <AppBar elevation={0} {...rest}>
      <Toolbar>
        <Hidden lgDown>
          <RouterLink to="/">
            <Logo style={{ width: '16%' }} />
          </RouterLink>
        </Hidden>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgUp>
          <RouterLink to="/">
            <Logo style={{ width: '40%' }} />
          </RouterLink>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
