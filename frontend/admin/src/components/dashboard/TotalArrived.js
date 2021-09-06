import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import { blue } from '@material-ui/core/colors';

const TotalArrived = (props) => {
  const { bookings } = props;
  const arrivedBookings = (bookings) => {
    const PendingBookings = bookings.filter(
      (booking) => booking.status === 'Arrived'
    );
    const count = PendingBookings.length;
    return count;
  };
  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL ARRIVED
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {arrivedBookings(bookings)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: blue[600],
                height: 56,
                width: 56
              }}
            >
              <BookOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default TotalArrived;
