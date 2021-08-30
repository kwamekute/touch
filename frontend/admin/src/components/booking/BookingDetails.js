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
  arrival: '',
  departure: ''
};

const BookingDetails = (props) => {
  const { recordsforedit } = props;
  const [values, setValues] = useState(initialValues);

  useEffect(() => {
    if (recordsforedit != null);
    setValues({
      ...recordsforedit
    });
  }, [recordsforedit]);

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('formData=>', values);
  };

  return (
    <form autoComplete="off" noValidate {...props}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="FullName"
              name="name"
              required
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
              label="Email Address"
              name="email"
              required
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
              label="Room Type"
              name="roomType"
              required
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
              label="Arrival"
              name="arrival"
              required
              value={values.arrival}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Depature"
              name="depature"
              value={values.departure}
              variant="outlined"
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Booking Status"
              name="status"
              onChange={handleChange}
              required
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
        <Button color="primary" variant="contained" onClick={handleSubmit}>
          Update
        </Button>
      </Box>
    </form>
  );
};

export default BookingDetails;
