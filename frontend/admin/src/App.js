import 'react-perfect-scrollbar/dist/css/styles.css';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { GlobalProvider } from './context/GlobalState';
import WithAxios from './components/helpers/WithAxios';

const App = () => {
  const routing = useRoutes(routes);

  return (
    <GlobalProvider>
      <WithAxios>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {routing}
        </ThemeProvider>
      </WithAxios>
    </GlobalProvider>
  );
};

export default App;
