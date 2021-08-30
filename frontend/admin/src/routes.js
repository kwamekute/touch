import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import BookingList from 'src/pages/BookingList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';

const isLogin = () => {
  const user = localStorage.getItem('authenticatedUser');
  if (!user) {
    return false;
  }
  return true;
};

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {
        path: 'account',
        element: isLogin() ? <Account /> : <Navigate to="/login" />
      },
      {
        path: 'bookings',
        element: isLogin() ? <BookingList /> : <Navigate to="/login" />
      },
      {
        path: 'dashboard',
        element: isLogin() ? <Dashboard /> : <Navigate to="/login" />
      },
      {
        path: 'products',
        element: isLogin() ? <ProductList /> : <Navigate to="/login" />
      },
      {
        path: 'settings',
        element: isLogin() ? <Settings /> : <Navigate to="/login" />
      },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      {
        path: '/',
        element: isLogin() ? (
          <Navigate to="/app/dashboard" />
        ) : (
          <Navigate to="login" />
        )
      },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
