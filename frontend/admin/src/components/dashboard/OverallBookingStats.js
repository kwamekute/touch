import { useContext } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  colors,
  Divider,
  useTheme
} from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import { GlobalContext } from 'src/context/GlobalState';
import moment from 'moment';

const BOOKING_BUCKETS = {
  January: 'January',
  February: 'February',
  March: 'March',
  April: 'April',
  May: 'May',
  June: 'June',
  July: 'July',
  August: 'August',
  September: 'September',
  October: 'October',
  November: 'November',
  December: 'December'
};

function OverallBookingStats() {
  const theme = useTheme();
  const { bookings } = useContext(GlobalContext);

  const output1 = {};

  for (const bucket in BOOKING_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (
        moment(current.createdAt).format('MMMM') === BOOKING_BUCKETS[bucket] &&
        parseInt(moment(current.createdAt).format('YYYY')) ===
          parseInt(new Date().getFullYear())
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);

    output1[bucket] = filteredBookingsCount;
  }

  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ],
    datasets: [
      {
        label: 'Bookings',
        data: Object.values(output1),
        fill: false,
        borderColor: colors.cyan[600],
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    }
  };
  return (
    <Card>
      <CardHeader title="Overall booking Stats" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Line data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}

export default OverallBookingStats;
