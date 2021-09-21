import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { red, green, grey } from '@material-ui/core/colors';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

function colorForStatus(stats) {
  const status = stats.canceled_percentage_difference;
  if (status < 0) {
    return green;
  } else if (status > 0) {
    return red;
  }
  return grey;
}

const TotalCanceled = (props) => {
  const { stats } = props;

  return (
    <Card sx={{ height: '100%' }} {...props}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="h6">
              TOTAL CANCELED
            </Typography>
            <Typography color="textPrimary" variant="h3">
              {stats.total_canceled}
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
        <Box
          sx={{
            pt: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          {stats.canceled_percentage_difference < 0 ? (
            <ArrowUpwardIcon sx={{ color: colorForStatus(stats)[900] }} />
          ) : stats.canceled_percentage_difference === null ? (
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
            {stats.canceled_percentage_difference === null
              ? '-'
              : Math.abs(stats.canceled_percentage_difference)}
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

export default TotalCanceled;
