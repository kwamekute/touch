import { useContext } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  colors,
  useTheme
} from '@material-ui/core';
import { GlobalContext } from 'src/context/GlobalState';

const CurrentBookingStats = (props) => {
  const theme = useTheme();

  const { bookings } = useContext(GlobalContext);

  const canceledBookings = bookings.filter(
    (booking) => booking.status === 'Canceled'
  ).length;

  const honoredBookings = bookings.filter(
    (booking) => booking.status === 'Departed'
  ).length;

  const awaitingBookings = bookings.filter(
    (booking) => booking.status === 'Awaiting'
  ).length;

  const arrived = bookings.filter(
    (booking) => booking.status === 'Arrived'
  ).length;

  const data = {
    datasets: [
      {
        data: [arrived, awaitingBookings, honoredBookings, canceledBookings],
        backgroundColor: [
          colors.indigo[500],
          colors.orange[600],
          colors.green[600],
          colors.red[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: ['Arrived', 'Awaiting', 'Departed', 'Canceled']
  };

  const options = {
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: true
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card {...props}>
      <CardHeader title="Current Stats" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 350,
            position: 'relative'
          }}
        >
          <Doughnut data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentBookingStats;
