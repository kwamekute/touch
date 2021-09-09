import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography
} from '@material-ui/core';
import { GlobalContext } from 'src/context/GlobalState';

const ForgotPassword = () => {
  const { fogortPassword, message, error } = useContext(GlobalContext);

  return (
    <>
      <Helmet>
        <title>ForgotPassword | Luxury Touch Hotel</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '80%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required')
            })}
            onSubmit={async (values) => {
              await fogortPassword(values);
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography align="center" color="textPrimary" variant="h2">
                    Reset Password
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    A Reset link will be sent to the email associated with your
                    admin account
                  </Typography>
                  {message && (
                    <Box sx={{ mt: 3 }}>
                      <Typography
                        align="center"
                        style={{ color: '#3bc70c' }}
                        gutterBottom
                        variant="body1"
                      >
                        {message}
                      </Typography>
                    </Box>
                  )}
                  {error && (
                    <Box sx={{ mt: 3 }}>
                      <Typography align="center" color="error" variant="body1">
                        {error}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Enter Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />

                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    RESET PASSWORD
                  </Button>
                </Box>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
