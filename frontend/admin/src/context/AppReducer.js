export default (state, action) => {
  switch (action.type) {
    case 'GET_BOOKINGS':
      return {
        ...state,
        loading: false,
        bookings: action.payload
      };
    case 'DELETE_BOOKING':
      return {
        ...state,
        bookings: state.bookings.filter(
          (booking) => booking._id !== action.payload
        )
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
          booking._id === action.payload_id ? action.payload : booking
        )
      };
    case 'GET_BOOKINGS_ERROR':
      return {
        ...state,
        error: action.payload
      };
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
    default:
      return state;
  }
};
