import { useEffect, useState } from 'react';
import { Box, Button, CardContent, Grid, TextField } from '@material-ui/core';

const status = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Super-Admin', label: 'Super-Admin' }
];

const initialValues = {
  id: 0,
  email: '',
  roomType: '',
  name: '',
  phone: '',
  permission: ''
};

const AdminDetails = (props) => {
  const { recordsforedit, handleSubmit } = props;
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
              label="Admin Permission"
              name="permission"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.permission}
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

export default AdminDetails;
