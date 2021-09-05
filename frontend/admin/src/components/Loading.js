import { CircularProgress, Box } from '@material-ui/core';

export default function Loading() {
  return (
    <>
      <Box
        sx={{
          display: 'Block',
          marginLeft: 'auto',
          marginRight: 'auto',
          width: '20%'
        }}
      >
        <CircularProgress />
      </Box>
    </>
  );
}
