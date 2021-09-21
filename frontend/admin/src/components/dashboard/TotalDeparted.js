import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green, red, grey } from '@material-ui/core/colors';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

function colorForStatus(stats) {
  const status = stats.departed_percentage_difference;
  if (status < 0) {
    return green;
  } else if (status > 0) {
    return red;
  }
  return grey;
}

const TotalDeparted = (props) => {
  const { stats } = props;

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL DEPARTED
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {stats.total_departed}
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
          {stats.departed_percentage_difference < 0 ? (
            <ArrowUpwardIcon sx={{ color: colorForStatus(stats)[900] }} />
          ) : stats.departed_percentage_difference === null ? (
            <ArrowRightAltIcon sx={{ color: colorForStatus(stats)[900] }} />
          ) : (
            <ArrowDownwardIcon sx={{ color: colorForStatus(stats)[900] }} />
          )}

          <Typography
            sx={{
              color: colorForStatus(stats)[900],
              mr: 1
            }}
            variant="body2"
          >
            {stats.departed_percentage_difference === null
              ? '-'
              : Math.abs(stats.departed_percentage_difference)}
            %
          </Typography>
          <Typography
            sx={{
              color: colorForStatus(stats)[900]
            }}
            variant="caption"
          >
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TotalDeparted;
