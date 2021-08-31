import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

const user = JSON.parse(localStorage.getItem('authenticatedUser'));

const initialState = {
  bookings: [],
  auth: user ? true : false,
  loading: true,
  error: null,
  user: user
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  async function logInUser({ email, password }) {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      dispatch({ type: 'LOGIN_USER', payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOGIN_USER_ERROR',
        payload: error.response.data.error
      });
    }
  }

  function logOutUser() {
    dispatch({ type: 'LOG_OUT_USER' });
  }

  async function getBookings(user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const res = await axios.get('http://localhost:5000/api/bookings', config);

      dispatch({ type: 'GET_BOOKINGS', payload: res.data.bookings });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_BOOKINGS_ERROR',
        payload: error.response.data.error
      });
    }
  }

  async function deleteBooking(id) {
    try {
      await axios.delete();
    } catch (error) {}
    dispatch({ type: 'DELETE_BOOKING', payload: id });
  }

  function addBooking(booking) {
    dispatch({ type: 'ADD_BOOKING', payload: booking });
  }

  return (
    <GlobalContext.Provider
      value={{
        bookings: state.bookings,
        auth: state.auth,
        error: state.error,
        loading: state.loading,
        user: state.user,
        deleteBooking,
        addBooking,
        getBookings,
        logInUser,
        logOutUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
