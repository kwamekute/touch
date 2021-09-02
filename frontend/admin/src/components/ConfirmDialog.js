import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
  dialog: {
    padding: theme.spacing(2),
    position: 'absolute'
  },
  dialogContent: {
    textAlign: 'center'
  },
  titleIcon: {
    '&:hover': {
      cursor: 'default'
    },
    '& .MuiSvgIcon-root': {
      fontSize: '4rem'
    }
  }
}));

export default function ConfirmDialog(props) {
  const { color, confirmDialog, setConfirmDialog } = props;
  const classes = useStyles();
  return (
    <Dialog open={confirmDialog.isOpen} classes={{ paper: classes.dialog }}>
      <DialogTitle></DialogTitle>
      <DialogContent className={classes.dialogContent}>
        <Typography variant="h4">{confirmDialog.title}</Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={confirmDialog.onConfirm} color="primary">
          Yes
        </Button>
        <Button
          onClick={() => {
            setConfirmDialog({ ...confirmDialog, isOpen: false });
          }}
          color="secondary"
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
