import { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';
import { URL } from '../constants/index';

const user = JSON.parse(localStorage.getItem('authenticatedUser'));

const initialState = {
  bookings: [],
  admins: [],
  stats: [],
  auth: user ? true : false,
  loading: true,
  error: null,
  user: user,
  message: null
};

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  //actions
  //get stats action
  async function getStats(user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };

      const res = await axios.get(`${URL}api/bookings/stats`, config);

      dispatch({ type: 'GET_STATS', payload: res.data.stats });
    } catch (error) {
      dispatch({ type: 'GET_STATS_ERROR', payload: error });
    }
  }
  //Register user action
  async function addNewUser(formData, user) {
    const { name, email, phone, permission } = formData;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      await axios.post(
        `${URL}api/auth/register`,
        {
          name,
          email,
          phone,
          permission
        },
        config
      );
      dispatch({ type: 'ADD_USER' });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ADD_USER_ERROR',
        payload: error.response?.data.error
      });
    }
  }

  //get all users (Admins) action
  async function getAdmins(user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const res = await axios.get(`${URL}api/auth/admins`, config);
      dispatch({ type: 'GET_ADMINS', payload: res.data.users });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_ADMINS_ERROR',
        payload: error?.response?.data.error
      });
    }
  }

  //update Admin details
  async function updateAdmin(user, formData) {
    const { _id: id, permission } = formData;
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const res = await axios.put(
        `${URL}api/auth/admins/${id}`,
        { permission },
        config
      );
      dispatch({ type: 'UPDATE_ADMINS', payload: res.data.updatedUser });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'UPDATE_ADMINS_ERROR',
        payload: error?.response?.data.error
      });
    }
  }

  //finish admin account setup
  async function finishSetup(formData, params) {
    const { password, passwordConfirmation } = formData;
    const { inviteToken } = params;
    try {
      const res = await axios.put(`${URL}api/auth/newaccount/${inviteToken}`, {
        password,
        passwordConfirmation
      });
      dispatch({ type: 'FINISH_ADMIN_SETUP', payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ADD_USER_ERROR',
        payload: error.response?.data.error
      });
    }
  }

  //logIn user action
  async function logInUser({ email, password }) {
    try {
      const res = await axios.post(`${URL}api/auth/login`, {
        email,
        password
      });
      dispatch({ type: 'LOGIN_USER', payload: res.data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'LOGIN_USER_ERROR',
        payload: error.response?.data.error
      });
    }
  }

  //forgotten password
  async function fogortPassword({ email }) {
    try {
      const res = await axios.post(`${URL}api/auth/forgotpassword`, {
        email
      });
      dispatch({ type: 'FORGOT_PASSWORD', payload: res.data.message });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'FORGOT_PASSWORD_ERROR',
        payload: error.response?.data.error
      });
    }
  }

  //Rset password
  async function resetPassword(formData, params) {
    const { password, passwordConfirmation } = formData;
    const { resetToken } = params;
    try {
      const res = await axios.put(
        `${URL}api/auth/resetpassword/${resetToken}`,
        {
          password,
          passwordConfirmation
        }
      );
      dispatch({ type: 'PASSWORD_RESET', payload: res.data.message });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'FORGOT_PASSWORD_ERROR',
        payload: error.response?.data.error
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
      const res = await axios.get(`${URL}api/bookings`, config);

      dispatch({ type: 'GET_BOOKINGS', payload: res.data.bookings });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_BOOKINGS_ERROR',
        payload: error.response?.data.error
      });
    }
  }

  async function getFilteredBookings(user, formData) {
    const { checkInDate, checkOutDate, email, name, phone, room } = formData;

    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const res = await axios.get(
        `${URL}api/bookings?name=${name}&email=${email}&phone=${phone}&roomType=${room}&checkIn=${checkInDate}&checkOut=${checkOutDate}`,
        config
      );

      dispatch({ type: 'GET_BOOKINGS', payload: res.data.bookings });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_BOOKINGS_ERROR',
        payload: error.response?.data.error
      });
    }
  }

  //Delete Booking action
  async function deleteBooking(id, user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const res = await axios.delete(`${URL}api/bookings/${id}`, config);

      dispatch({ type: 'DELETE_BOOKING', payload: res.data.deletedBooking });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_BOOKINGS_ERROR',
        payload: error.response?.data.error
      });
    }
  }
  //Delete Booking action
  async function deleteAdmin(id, user) {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const res = await axios.delete(`${URL}api/auth/admins/${id}`, config);

      dispatch({ type: 'DELETE_ADMINS', payload: res.data.deletedUser });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_ADMINS_ERROR',
        payload: error.response?.data.error
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
        `${URL}api/bookings/${formData._id}`,
        formData,
        config
      );

      dispatch({ type: 'UPDATE_BOOKING', payload: res.data.booking });
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'GET_BOOKINGS_ERROR',
        payload: error.response?.data.error
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
        admins: state.admins,
        message: state.message,
        stats: state.stats,
        deleteBooking,
        addBooking,
        updateBooking,
        getBookings,
        logInUser,
        logOutUser,
        addNewUser,
        finishSetup,
        fogortPassword,
        resetPassword,
        getFilteredBookings,
        getAdmins,
        updateAdmin,
        deleteAdmin,
        getStats
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
