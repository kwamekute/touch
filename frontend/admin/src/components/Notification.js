import { makeStyles, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

export default function Notification(props) {
  const { notify, setNotify } = props;

  const handleClose = (event) => {
    setNotify({
      ...notify,
      isOpen: false
    });
  };
  return (
    <Snackbar
      onClose={handleClose}
      open={notify.isOpen}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <Alert onClose={handleClose} severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
