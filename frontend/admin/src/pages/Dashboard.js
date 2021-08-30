import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import NewBooking from 'src/components/dashboard/NewBooking';
import LatestBookings from 'src/components/dashboard//LatestBookings';
import PendingBooking from 'src/components/dashboard/PendingBooking';
import HonoredBooking from 'src/components/dashboard/HonoredBooking';
import TotalCanceled from 'src/components/dashboard/TotalCanceled';

const Dashboard = () => (
  <>
    <Helmet>
      <title>Luxury Touch Hotel | Dashboard</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <NewBooking />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <HonoredBooking />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <PendingBooking />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalCanceled sx={{ height: '100%' }} />
          </Grid>
          <Grid item lg={12} md={12} xl={12} xs={12}>
            <LatestBookings />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Dashboard;
