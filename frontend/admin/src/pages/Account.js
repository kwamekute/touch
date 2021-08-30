import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import AccountToolbar from 'src/components/account/AccountToolbar';

const Account = () => {
  const user = JSON.parse(localStorage.getItem('authenticatedUser')).user;

  return (
    <>
      <Helmet>
        <title>Luxury Touch Hotel | Account</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          {user.permission === 'Super-Admin' ? (
            <Box sx={{ pb: 3 }}>
              <AccountToolbar />
            </Box>
          ) : null}
          <Grid container spacing={3}>
            <Grid item lg={4} md={6} xs={12}>
              <AccountProfile details={user} />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <AccountProfileDetails details={user} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Account;
