import { useContext } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Link,
  Typography
} from '@material-ui/core';
import { GlobalContext } from 'src/context/GlobalState';

const Login = () => {
  const navigate = useNavigate();
  const { logInUser, error, message } = useContext(GlobalContext);

  return (
    <>
      <Helmet>
        <title>Luxury Touch Hotel | Login </title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
              password: Yup.string().max(255).required('Password is required')
            })}
            onSubmit={(values) => {
              logInUser(values).then(() => {
                navigate('/app/dashboard', { replace: true });
              });
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
                <Box
                  sx={{
                    display: 'Block',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    width: '30%'
                  }}
                >
                  <img alt="Logo" src="/static/lux-touch.png" />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Typography color="textPrimary" align="center" variant="h2">
                    Sign in
                  </Typography>
                  <Typography
                    align="center"
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Sign into your admin account
                  </Typography>
                </Box>
                {error && (
                  <Box>
                    <Typography
                      color="error"
                      align="center"
                      gutterBottom
                      variant="body2"
                    >
                      {error}
                    </Typography>
                  </Box>
                )}
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

                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
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
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign in now
                  </Button>
                </Box>
                <Typography color="textSecondary" variant="body1">
                  Forgot Password?
                  <Link
                    component={RouterLink}
                    to="/forgotpassword"
                    variant="h6"
                  >
                    Reset
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
