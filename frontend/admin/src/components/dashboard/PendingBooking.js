import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';

const PendingBooking = (props) => {
  const { stats } = props;

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL PENDING
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {stats.total_pending}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[600],
                height: 56,
                width: 56
              }}
            >
              <HelpOutlineOutlinedIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PendingBooking;
