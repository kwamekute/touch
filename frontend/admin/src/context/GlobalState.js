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

  //logIn user action
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

  //logOut user action
  function logOutUser() {
    dispatch({ type: 'LOG_OUT_USER' });
  }

  //get all bookings action
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

  //Delete Booking action
  async function deleteBooking(id) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const res = await axios.delete(
        `http://localhost:5000/api/bookings/${id}`,
        config
      );

      dispatch({ type: 'DELETE_BOOKINGS', payload: res.data.bookings });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_BOOKINGS_ERROR',
        payload: error.response.data.error
      });
    }
  }

  //Update Booking action
  async function updateBooking(formData, user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const res = await axios.put(
        `http://localhost:5000/api/bookings/${formData._id}`,
        formData,
        config
      );

      dispatch({ type: 'UPDATE_BOOKING', payload: res.data.booking });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_BOOKINGS_ERROR',
        payload: error.response.data.error
      });
    }
  }

  //Adding Booking action
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
        updateBooking,
        getBookings,
        logInUser,
        logOutUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
