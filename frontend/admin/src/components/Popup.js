import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import { X as CloseIcon } from 'react-feather';

const useStyles = makeStyles((theme) => ({
  dialogWraper: {
    padding: theme.spacing(1)
  }
}));

export default function Popup(props) {
  const { title, subTitle, children, openPopup, setOpenPopup } = props;

  const classes = useStyles();

  return (
    <Dialog
      open={openPopup}
      maxWidth="md"
      classes={{ paper: classes.dialogWraper }}
    >
      <DialogTitle disableTypography>
        <div style={{ display: 'flex' }}>
          <div
            style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}
          >
            <Typography color="textPrimary" variant="h4" component="div">
              {title}
            </Typography>
            <Typography color="textSecondary" variant="body1" component="div">
              {subTitle}
            </Typography>
          </div>
          <IconButton
            color="secondary"
            edge="end"
            onClick={() => {
              setOpenPopup(false);
            }}
          >
            <CloseIcon size="20" />
          </IconButton>
        </div>
      </DialogTitle>
      <DialogContent dividers>{children}</DialogContent>
    </Dialog>
  );
}
