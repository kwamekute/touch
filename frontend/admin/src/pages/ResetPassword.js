import { useContext } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
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

const ResetPassword = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { resetPassword, error } = useContext(GlobalContext);

  return (
    <>
      <Helmet>
        <title>Luxury Touch Hotel | Reset Password</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              passwordConfirmation: '',
              password: '',
              policy: false
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string().min(8).required('Password is required'),
              passwordConfirmation: Yup.string()
                .min(8)
                .required('Confirm Password is required')
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
            onSubmit={async (values) => {
              await resetPassword(values, params);
              navigate('/login', { replace: true });
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
                  <Typography color="textPrimary" variant="h2">
                    Reset password
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Enter a new password for your account
                  </Typography>
                  {error && (
                    <Box sx={{ mt: 3 }}>
                      <Typography align="center" color="error" variant="body1">
                        {error}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(
                    touched.passwordConfirmation && errors.passwordConfirmation
                  )}
                  fullWidth
                  helperText={
                    touched.passwordConfirmation && errors.passwordConfirmation
                  }
                  label="Confirm password"
                  margin="normal"
                  name="passwordConfirmation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.passwordConfirmation}
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
                    RESET PASSWORD NOW
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

export default ResetPassword;
