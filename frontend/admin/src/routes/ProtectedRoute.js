import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export function ProtectedRoute({ children }) {
  const { auth } = useContext(GlobalContext);

  const location = useLocation();

  return auth ? children : <Navigate to="/login" state={{ from: location }} />;
}
