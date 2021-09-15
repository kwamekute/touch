import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors
} from '@material-ui/core';
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

const Sales = (props) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { bookings, getBookings, logOutUser, user, error } =
    useContext(GlobalContext);

  useEffect(async () => {
    await getBookings(user);
    if (error === 'Access not authorized, There was an error => jwt expired') {
      logOutUser();
      navigate('/login', { replace: true });
    }
    //eslint-diable-next-line react-hooks/exhustive-deps
  }, []);

  const output1 = {};
  const output2 = {};

  for (const bucket in BOOKING_BUCKETS) {
    const filteredBookingsCount = bookings.reduce((prev, current) => {
      if (
        moment(current.createdAt).format('MMMM') === BOOKING_BUCKETS[bucket] &&
        current.status === 'Canceled' &&
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
  for (const bucket in BOOKING_BUCKETS) {
    const filteredBookingsCount1 = bookings.reduce((prev, current) => {
      if (
        moment(current.createdAt).format('MMMM') === BOOKING_BUCKETS[bucket] &&
        current.status === 'Departed' &&
        parseInt(moment(current.createdAt).format('YYYY')) ===
          parseInt(new Date().getFullYear())
      ) {
        return prev + 1;
      } else {
        return prev;
      }
    }, 0);

    output2[bucket] = filteredBookingsCount1;
  }
  const data = {
    datasets: [
      {
        backgroundColor: colors.green[600],
        data: Object.values(output2),
        label: 'Departed',
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5
      },
      {
        backgroundColor: colors.red[600],
        data: Object.values(output1),
        label: 'Canceled',
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5
      }
    ],
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
    ]
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: true },
    maintainAspectRatio: false,
    responsive: true,

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
    },
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
      <CardHeader title="Yearly Stats" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
};

export default Sales;
