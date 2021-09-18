import { useContext, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export function ProtectedRoute({ children }) {
  const { auth, getBookings, getStats, user, bookings, error } =
    useContext(GlobalContext);
  const navigate = useNavigate();
  useEffect(() => {
    getBookings(user).then(() => {
      if (
        error === 'Access not authorized, There was an error => jwt expired'
      ) {
        logOutUser();
        navigate('/login', { replace: true });
      }
    });
    //eslint-diable-next-line react-hooks/exhustive-deps;
  }, []);

  useEffect(() => {
    getStats(user);
  }, [bookings]);
  const location = useLocation();

  return auth ? children : <Navigate to="/login" state={{ from: location }} />;
}
