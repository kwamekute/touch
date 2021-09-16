import { useState, useEffect, useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Grid
} from '@material-ui/core';
import moment from 'moment';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers';
//date util library
import DateFnsUtils from '@date-io/date-fns';
import { GlobalContext } from 'src/context/GlobalState';
import isThisQuarter from 'date-fns/isThisQuarter';

const initialValues = {
  email: '',
  name: '',
  phone: '',
  room: ''
};
const rooms = [
  { value: 'Standard Room', label: 'Standard Room' },
  { value: 'Presidential Suite', label: 'Presidential Suite' },
  { value: 'Delux Twin Bed Room', label: 'Delux Twin Bed Room' },
  { value: 'Deluxe Standard Room', label: 'Deluxe Standard Room' },
  { value: 'Deluxe Room', label: 'Deluxe Room' }
];

const CustomerListToolbar = ({ open, setOpen }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [values, setValues] = useState(initialValues);

  const { getFilteredBookings, user, getBookings } = useContext(GlobalContext);

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

  const handleSubmit = async () => {
    setOpen(true);
    await getFilteredBookings(user, values);
    setOpen(false);
  };
  const handleReset = async () => {
    setOpen(true);
    await getBookings(user);
    setValues(initialValues);
    setOpen(false);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Box>
        <Card>
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
                    type="text"
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
                >
                  Search
                </Button>
                <Button
                  style={{ marginLeft: 10 }}
                  color="primary"
                  variant="contained"
                  onClick={handleReset}
                >
                  Reset filters
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
