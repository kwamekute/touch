import { useContext, useMemo } from 'react';
import axios from 'axios';
import { GlobalContext } from 'src/context/GlobalState';
import swal from 'sweetalert';
import { values } from 'lodash-es';

const WithAxios = ({ children }) => {
  const { logOutUser } = useContext(GlobalContext);

  useMemo(() => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Prevent infinite loops
        console.log('errorMSG', error.message);
        if (!error?.response?.status || error.message === 'Network Error') {
          swal({
            title: 'Bad or No connection',
            text: 'Are you sure you are connected to the internet?',
            icon: 'warning',
            buttons: 'Reload page'
          }).then((value) => {
            if (value || value === null) {
              location.reload();
            }
          });

          return Promise.reject(error);
        }
        if (
          error?.response?.status === 401 ||
          error.message === 'Request failed with status code 401'
        ) {
          logOutUser();
          return Promise.reject(error);
        }
        // specific error handling done elsewhere
        return Promise.reject(error);
      }
    );
  }, [logOutUser]);

  return children;
};

export default WithAxios;
