import { Avatar, Card, CardContent, Grid, Typography } from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';

const TotalCanceled = (props) => (
  <Card {...props}>
    <CardContent>
      <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
        <Grid item>
          <Typography color="textSecondary" gutterBottom variant="h6">
            TOTAL CANCELED
          </Typography>
          <Typography color="textPrimary" variant="h3">
            200
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
    </CardContent>
  </Card>
);

export default TotalCanceled;
