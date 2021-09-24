import { useEffect, useState } from 'react';
import { Box, Button, CardContent, Grid, TextField } from '@material-ui/core';

const status = [
  { value: 'Awaiting', label: 'Awaiting' },
  { value: 'Arrived', label: 'Arrived' },
  { value: 'Departed', label: 'Departed' },
  { value: 'Canceled', label: 'Canceled' }
];

const initialValues = {
  id: 0,
  email: '',
  roomType: '',
  name: '',
  phone: '',
  status: '',
  checkIn: '',
  checkOut: ''
};

const BookingDetails = (props) => {
  const { recordsforedit, handleSubmit } = props;
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (recordsforedit != null);
    setValues({
      ...recordsforedit
    });
  }, [recordsforedit]);

  const isEnabled = values?.status === 'Awaiting';

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Name"
              name="name"
              value={values.name}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Email Address"
              name="email"
              value={values.email}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Room Type"
              name="roomType"
              value={values.roomType}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Phone Number"
              name="phone"
              type="text"
              value={values.phone}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="checkIn"
              name="checkIn"
              value={values.checkIn}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="checkOut"
              name="checkOut"
              value={values.checkOut}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Adults"
              name="roomType"
              value={values.numberAdults}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Children"
              name="roomType"
              value={values.numberChildren}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              size="small"
              label="Booking Status"
              name="status"
              onChange={handleChange}
              select
              SelectProps={{ native: true }}
              value={values.status}
              variant="outlined"
            >
              {status.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </CardContent>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end'
        }}
      >
        <Button
          disabled={isEnabled}
          color="primary"
          variant="contained"
          onClick={() => {
            handleSubmit(values);
          }}
        >
          Update
        </Button>
      </Box>
    </form>
  );
};

export default BookingDetails;
