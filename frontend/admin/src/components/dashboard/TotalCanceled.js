import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  Box
} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const TotalCanceled = (props) => {
  const { bookings } = props;
  const canceledBookings = (bookings) => {
    const PendingBookings = bookings.filter(
      (booking) => booking.status === 'Canceled'
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
              TOTAL CANCELED
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {canceledBookings(bookings)}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
            >
              <CancelOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
        {/* <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <ArrowDownwardIcon sx={{ color: red[900] }} />
          <Typography
            sx={{
              color: red[900],
              mr: 1
            }}
            variant="body2"
          >
            12%
          </Typography>
          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box> */}
      </CardContent>
    </Card>
  );
};

export default TotalCanceled;
