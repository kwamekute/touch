import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Box, Container, Grid } from '@material-ui/core';
import TotalArrived from 'src/components/dashboard/TotalArrived';
import PendingBooking from 'src/components/dashboard/PendingBooking';
import TotalDeparted from 'src/components/dashboard/TotalDeparted';
import TotalCanceled from 'src/components/dashboard/TotalCanceled';

import { GlobalContext } from 'src/context/GlobalState';
import CurrentBookingStats from 'src/components/dashboard/CurrentBookingStats';
import YearlyStat from 'src/components/dashboard/YearlyStat';
import OverallBookingStats from 'src/components/dashboard/OverallBookingStats';
import RoomsBookingStats from 'src/components/dashboard/RoomsBookingStats';

const Dashboard = () => {
  const { stats } = useContext(GlobalContext);

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
          <Grid container spacing={2}>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalArrived stats={stats} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalDeparted stats={stats} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <PendingBooking stats={stats} />
            </Grid>
            <Grid item lg={3} sm={6} xl={3} xs={12}>
              <TotalCanceled stats={stats} sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={6} xl={9} xs={12}>
              <OverallBookingStats />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <CurrentBookingStats sx={{ height: '100%' }} />
            </Grid>
            <Grid item lg={8} md={6} xl={9} xs={12}>
              <YearlyStat />
            </Grid>
            <Grid item lg={4} md={6} xl={3} xs={12}>
              <RoomsBookingStats sx={{ height: '100%' }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Dashboard;
