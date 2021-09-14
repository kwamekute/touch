---
sidebar_position: 8
---

# Protected Routes

This is a simple component that can be used to protect a private route. It controls whether it should allow navigation to a requested route based on given context.

## Example

```shell
import { ProtectedRoute } from 'src/routes/ProtectedRoute';
import Account from 'src/pages/Account';

const routes = [{
    path: 'app',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [{ path: 'account', element: <Account /> } ]
}]
```

## Protected Route component

```shell
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';

export function ProtectedRoute({ children }) {
  const { auth } = useContext(GlobalContext);
  const location = useLocation();

  return auth ? children : <Navigate to="/login" state={{ from: location }} />;
}
```

## How it works

It accesses and auth state variable using **useContext** hook and extracts the required data to detect whether it should render the children passed as props, otherwise it renders the Login component.

This is done so that the user can access private routes, or login on the rendered Login component. On a successful login, the component renders the correct component as necessary. Usually this behaviour is named Deep Linking.
