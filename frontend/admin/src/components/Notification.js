import { makeStyles, Snackbar, Alert } from '@material-ui/core';

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
      <Alert variant="filled" onClose={handleClose} severity={notify.type}>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}
