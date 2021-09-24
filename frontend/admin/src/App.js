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
    function (response) {
      return response;
    },
    function (error) {
      if (
        error.response.status === 401 ||
        error.response.status === 403 ||
        error.response.data.error ===
          'Access not authorized, There was an error => jwt expired' ||
        error.response.data.error ===
          'Access not authorized, There was an error => jwt malformed'
      ) {
        navigate('/login', { replace: true });
        return Promise.reject(error);
      } else {
        return Promise.reject(error);
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
