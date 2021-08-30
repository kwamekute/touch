import { useEffect, useState } from 'react';
import { Box, Button, CardContent, Grid, TextField } from '@material-ui/core';

const permissions = [
  { value: 'Admin', label: 'Admin' },
  { value: 'Super-Admin', label: 'Super-Admin' }
];

const initialValues = {
  id: 0,
  email: '',
  name: '',
  phone: '',
  permission: ''
};

const NewAdminForm = (props) => {
  const [values, setValues] = useState(initialValues);

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
              onChange={handleChange}
              required
              value={values.name}
              variant="outlined"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              onChange={handleChange}
              required
              value={values.email}
              variant="outlined"
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              onChange={handleChange}
              name="phone"
              type="text"
              value={values.phone}
              variant="outlined"
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <TextField
              fullWidth
              label="Admin Role"
              name="permission"
              onChange={handleChange}
              required
              select
              SelectProps={{ native: true }}
              value={values.status}
              variant="outlined"
            >
              {permissions.map((option) => (
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

export default NewAdminForm;
