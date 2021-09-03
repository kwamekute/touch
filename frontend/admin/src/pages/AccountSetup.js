import { useContext } from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { GlobalContext } from 'src/context/GlobalState';

const AccountSetup = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const { finishSetup } = useContext(GlobalContext);

  return (
    <>
      <Helmet>
        <title>Luxury Touch Hotel | Create Password</title>
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
            onSubmit={(values) => {
              finishSetup(values, params).then(() => {
                navigate('/app/dashboard', { replace: true });
              });
              // console.log(location);
              // console.log('Props=>', props);
              // console.log('Params=>', params);
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
                    Account setup
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Enter a new password to finish your account setup
                  </Typography>
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
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography color="textSecondary" variant="body1">
                    I have read the{' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>{errors.policy}</FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    submit
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

export default AccountSetup;
