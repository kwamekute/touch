import { useEffect, useContext } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  Button
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  User as UserIcon,
  Users as UsersIcon,
  Book as BookIcon,
  LogOut as LogoutIcon
} from 'react-feather';
import NavItem from './NavItem';
import { GlobalContext } from 'src/context/GlobalState';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/bookings',
    icon: BookIcon,
    title: 'Bookings',
    badge: true,
    count: null
  },

  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  }
  // {
  //   href: '/app/settings',
  //   icon: SettingsIcon,
  //   title: 'Settings'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, logOutUser, bookings } = useContext(GlobalContext);

  // check for number of pending bookings
  const pendingBookings = (bookings) => {
    const PendingBookings = bookings.filter(
      (booking) => booking.status === 'Awaiting'
    );
    const count = PendingBookings.length;
    return count;
  };

  //assign number of pending bookings to bookings navbar Item
  items[1].count = pendingBookings(bookings);

  const handleSignout = () => {
    logOutUser();
    navigate('/login', { replace: true });
  };

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src=""
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/app/account"
        />
        <Typography color="textPrimary" variant="h5">
          {user?.user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user?.user.permission}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              badge={item.badge}
              count={item?.count}
            />
          ))}
        </List>
        {user?.user?.permission === 'Super-Admin' && (
          <Button
            component={RouterLink}
            to="/app/admins"
            sx={{
              color: 'text.secondary',
              fontWeight: 'medium',
              justifyContent: 'flex-start',
              letterSpacing: 0,
              py: 1.25,
              textTransform: 'none',
              width: '100%',
              '& svg': {
                mr: 1
              }
            }}
          >
            <UsersIcon size="20" />
            <span>Manage Admins</span>
          </Button>
        )}
        <Button
          onClick={handleSignout}
          sx={{
            color: 'text.secondary',
            fontWeight: 'medium',
            justifyContent: 'flex-start',
            letterSpacing: 0,
            py: 1.25,
            textTransform: 'none',
            width: '100%',
            '& svg': {
              mr: 1
            }
          }}
        >
          <LogoutIcon size="20" />
          <span>Logout</span>
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default DashboardSidebar;
