import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import TotalArrived from 'src/components/dashboard/TotalArrived';
import LatestBookings from 'src/components/dashboard//LatestBookings';
import PendingBooking from 'src/components/dashboard/PendingBooking';
import TotalDeparted from 'src/components/dashboard/TotalDeparted';
import TotalCanceled from 'src/components/dashboard/TotalCanceled';

import { GlobalContext } from 'src/context/GlobalState';

const Dashboard = () => {
  const { bookings } = useContext(GlobalContext);
  return (
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
              <TotalArrived bookings={bookings} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalDeparted bookings={bookings} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <PendingBooking bookings={bookings} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCanceled bookings={bookings} sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={12} md={12} xl={12} xs={12}>
              <LatestBookings bookings={bookings} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
