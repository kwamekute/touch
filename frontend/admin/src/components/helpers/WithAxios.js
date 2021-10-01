import { useContext, useMemo } from 'react';
import axios from 'axios';
import { GlobalContext } from 'src/context/GlobalState';

const WithAxios = ({ children }) => {
  const { logOutUser } = useContext(GlobalContext);

  useMemo(() => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        // Prevent infinite loops
        console.log('errorMSG', error.message);
        if (!error?.response?.status && error.message === 'Network Error') {
          //TODO: change default alert to sweetAlert two or swal
          alert('Bad or No Internet connection');
          return Promise.reject(error);
        }
        if (error?.response?.status === 401) {
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
