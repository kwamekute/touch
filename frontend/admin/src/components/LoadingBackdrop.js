import { Backdrop, CircularProgress } from '@material-ui/core';

function LoadingBackdrop({ open }) {
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}

export default LoadingBackdrop;
