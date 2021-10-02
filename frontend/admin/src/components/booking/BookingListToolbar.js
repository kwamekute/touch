import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid,
  CardHeader
} from '@material-ui/core';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
//date util library
import DateFnsUtils from '@date-io/date-fns';

const initialValues = {
  email: '',
  name: '',
  phone: '',
  room: '',
  checkInDate: null,
  checkOutDate: null
};
const rooms = [
  { value: 'Standard Room', label: 'Standard Room' },
  { value: 'Presidential Suite', label: 'Presidential Suite' },
  { value: 'Delux Twin Bed Room', label: 'Delux Twin Bed Room' },
  { value: 'Deluxe Standard Room', label: 'Deluxe Standard Room' },
  { value: 'Deluxe Room', label: 'Deluxe Room' }
];

const CustomerListToolbar = ({ onhandleSearch, onhandleReset }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [values, setValues] = useState(initialValues);

  const isEnabled =
    values.email.length > 0 &&
    values.name.length > 0 &&
    values.phone.length > 0 &&
    values.room.length > 0 &&
    values?.checkInDate?.length > 0 &&
    values?.checkOutDate?.length > 0;
  checkInDate === 'Invalid date' && checkOutDate === 'Invalid date';

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  const handleCheckInDateChange = (date) => {
    setCheckInDate(date);
  };
  const handleCheckOutDateChange = (date) => {
    setCheckOutDate(date);
  };

  useEffect(() => {
    setValues({
      ...values,
      checkOutDate: moment(checkOutDate).format('DD/MM/YYYY')
    });
  }, [checkOutDate]);

  useEffect(() => {
    setValues({
      ...values,
      checkInDate: moment(checkInDate).format('DD/MM/YYYY')
    });
  }, [checkInDate]);

  const handleSubmit = () => {
    console.log(values);
    onhandleSearch(values);
  };

  const handleReset = () => {
    setValues(initialValues);
    setCheckInDate(null);
    setCheckOutDate(null);
    onhandleReset();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box>
        <Card>
          <CardHeader title="Advanced Search (All fields are requird to enable search)" />
          <CardContent>
            <form autoComplete="off" noValidate>
              <Grid container spacing={2}>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="FullName"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    onChange={handleChange}
                    label="Email Address"
                    name="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
                  <TextField
                    size="small"
                    fullWidth
                    onChange={handleChange}
                    label="Phone Number"
                    name="phone"
                    type="number"
                    value={values.phone}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Room type"
                    name="room"
                    onChange={handleChange}
                    select
                    SelectProps={{ native: true }}
                    value={values.room}
                    variant="outlined"
                  >
                    <option></option>
                    {rooms.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                </Grid>

                <Grid item md={6} xs={12}>
                  <KeyboardDatePicker
                    placeholder="dd/M/yyyy"
                    variant="inline"
                    fullWidth
                    size="small"
                    disableToolbar
                    margin="normal"
                    id="Check-in-date"
                    label="Check in date"
                    format="dd/M/yyyy"
                    value={checkInDate}
                    autoOk
                    onChange={handleCheckInDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </Grid>
                <Grid item md={6} xs={12}>
                  <KeyboardDatePicker
                    placeholder="dd/M/yyyy"
                    variant="inline"
                    size="small"
                    disableToolbar
                    fullWidth
                    margin="normal"
                    id="Check-out-date"
                    label="Check out date"
                    format="dd/M/yyyy"
                    value={checkOutDate}
                    autoOk
                    onChange={handleCheckOutDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </Grid>
              </Grid>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  marginTop: 2
                }}
              >
                <Button
                  color="primary"
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={!isEnabled}
                >
                  Search
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  color="primary"
                  variant="contained"
                  onClick={handleReset}
                  disabled={!isEnabled}
                >
                  Reset
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </MuiPickersUtilsProvider>
  );
};

export default CustomerListToolbar;
