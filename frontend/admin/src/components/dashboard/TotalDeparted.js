import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

const TotalDeparted = (props) => {
  const { bookings } = props;
  const numberDeparted = (bookings) => {
    const PendingBookings = bookings.filter(
      (booking) => booking.status === 'Departed'
    );
    const count = PendingBookings.length;
    return count;
  };
  return (
    <Card {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL DEPARTED
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {numberDeparted(bookings)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <AttachMoneyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            pt: 2
          }}
        >
          <ArrowUpwardIcon sx={{ color: green[900] }} />
          <Typography
            variant="body2"
            sx={{
              color: green[900],
              mr: 1
            }}
          >
            16%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalDeparted;
