export default (state, action) => {
  switch (action.type) {
    case 'GET_BOOKINGS':
      return {
        ...state,
        loading: false,
        bookings: action.payload
      };
    case 'GET_PENDING_BOOKINGS':
      return {
        ...state,
        pendingBookings: action.payload
      };
    case 'GET_STATS':
      return {
        ...state,
        stats: action.payload
      };
    case 'GET_STATS_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'GET_ADMINS':
      return {
        ...state,
        loading: false,
        admins: action.payload
      };
    case 'UPDATE_ADMINS':
      return {
        ...state,
        admins: state.admins.map((admin) =>
          admin._id === action.payload._id ? action.payload : admin
        )
      };
    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.payload._id
        )
      };
    case 'DELETE_ADMINS':
      return {
        ...state,
        admins: state.admins.filter((admin) => admin._id !== action.payload._id)
      };
    case 'ADD_BOOKING':
      return {
        ...state,
        bookings: [...state.bookings, action.payload]
      };
    case 'UPDATE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.map((booking) =>
          booking._id === action.payload._id ? action.payload : booking
        )
      };
    case 'GET_BOOKINGS_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'GET_ADMINS_ERROR':
      return {
        ...state,
        error: action.payload
      };
    // case 'ADD_USER':
    //   return {
    //     ...state
    //   };
    case 'ADD_USER_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'FINISH_ADMIN_SETUP':
    case 'LOGIN_USER':
      localStorage.setItem(
        'authenticatedUser',
        JSON.stringify({ ...action?.payload })
      );
      return {
        ...state,
        user: action.payload,
        auth: true
      };
    case 'LOG_OUT_USER':
      localStorage.clear();
      return {
        ...state,
        user: null,
        auth: false,
        bookings: [],
        error: null
      };
    case 'LOGIN_USER_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'PASSWORD_RESET':
      return {
        ...state,
        error: null,
        message: action.payload
      };
    case 'FORGOT_PASSWORD':
      return {
        ...state,
        error: null,
        message: action.payload
      };
    case 'FORGOT_PASSWORD_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'UPDATE_ADMINS_ERROR':
      return {
        ...state,
        error: action.payload
      };
    case 'GET_ADMINS_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
