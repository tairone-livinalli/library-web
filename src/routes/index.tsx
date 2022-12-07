import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';

import { useUser } from '../hooks/useUser';
import ListBooksPage from '../pages/ListBooksPage';
import User from '../pages/User';

const RequireUsername = ({ children }: { children: JSX.Element }) => {
  const { username } = useUser();
  const location = useLocation();

  if (!username) {
    return <Navigate to="/username" state={{ from: location }} replace />;
  }

  return children;
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={
          <RequireUsername>
            <ListBooksPage />
          </RequireUsername>
        }
      />
      <Route path="/username" element={<User />} />
    </>,
  ),
);

export default router;
