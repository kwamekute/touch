import { useContext, useMemo } from 'react';
import axios from 'axios';
import { GlobalContext } from 'src/context/GlobalState';

const WithAxios = ({ children }) => {
  const { logOutUser } = useContext(GlobalContext);

  useMemo(() => {
    axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        // Prevent infinite loops
        if (error.response.status === 401) {
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
