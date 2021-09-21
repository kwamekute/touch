import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { GlobalProvider } from './context/GlobalState';
import axios from 'axios';

const App = () => {
  const routing = useRoutes(routes);
  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) =>
      new Promise((resolve, reject) => {
        resolve(response);
      }),
    (error) => {
      if (!error.response) {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }

      if (error.response.status === 401 || 403 || 500) {
        localStorage.removeItem('authenticatedUser');
        navigate('/login', { replace: true });
      } else {
        return new Promise((resolve, reject) => {
          reject(error);
        });
      }
    }
  );

  return (
    <GlobalProvider>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        {routing}
      </ThemeProvider>
    </GlobalProvider>
  );
};

export default App;
