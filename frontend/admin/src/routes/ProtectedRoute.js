import { useContext, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export function ProtectedRoute({ children }) {
  const { auth, getBookings, getStats, user, bookings } =
    useContext(GlobalContext);
  useEffect(() => {
    getBookings(user);
    //eslint-diable-next-line react-hooks/exhustive-deps;
  }, []);

  useEffect(() => {
    getStats(user);
  }, [bookings]);
  const location = useLocation();

  return auth ? children : <Navigate to="/login" state={{ from: location }} />;
}
