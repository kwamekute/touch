import { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import AdminsList from 'src/components/admins/AdminsList';
import AccountToolbar from 'src/components/admins/AccountToolbar';
import { GlobalContext } from 'src/context/GlobalState';

const ManageAdmins = () => {
  const [filterfn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    }
  });
  const authenticatedUser = JSON.parse(
    localStorage.getItem('authenticatedUser')
  ).user;

  const { user, getAdmins } = useContext(GlobalContext);

  useEffect(() => {
    console.log('called');
    getAdmins(user);
  }, []);

  const handleSearch = (event) => {
    let target = event.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === '') return items;
        else
          return items.filter(
            (x) =>
              x.name.toLowerCase().includes(target.value.toLowerCase()) ||
              x.email.toLowerCase().includes(target.value.toLowerCase()) ||
              x.phone.includes(target.value)
          );
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Luxury Touch Hotel | Manage Admins</title>
      </Helmet>

      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          {authenticatedUser.permission === 'Super-Admin' ? (
            <Box sx={{ pb: 3 }}>
              <AccountToolbar />
            </Box>
          ) : null}
          <Box sx={{ pt: 3 }}>
            <AdminsList filterfn={filterfn} onhandlesearch={handleSearch} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ManageAdmins;
