import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import BookingList from 'src/pages/BookingList';
import Dashboard from 'src/pages/Dashboard';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import ProductList from 'src/pages/ProductList';
import Settings from 'src/pages/Settings';
import { ProtectedRoute } from 'src/routes/ProtectedRoute';
import AccountSetup from './pages/AccountSetup';
import ForgotPassword from './pages/ForgotPassword';
import ManageAdmins from './pages/ManageAdmins';
import ResetPassword from './pages/ResetPassword';

const routes = [
  {
    path: 'app',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: 'account', element: <Account /> },
      { path: 'bookings', element: <BookingList /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: 'admins', element: <ManageAdmins /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'forgotpassword', element: <ForgotPassword /> },
      { path: 'resetpassword/:resetToken', element: <ResetPassword /> },
      { path: 'newaccount/:inviteToken', element: <AccountSetup /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
