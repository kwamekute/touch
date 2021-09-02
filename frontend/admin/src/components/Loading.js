import { ClassNames } from '@emotion/react';
import {
  CircularProgress,
  makeStyles,
  Skeleton,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    paddingLeft: theme.spacing(8),
    position: 'obsolute',
    top: theme.spacing(5),
    bottom: theme.spacing(5),
    right: theme.spacing(5)
  },
  spinner: {
    display: 'flex'
  }
}));

export default function Loading() {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <CircularProgress className={classes.spinner} />
    </div>
  );
}
