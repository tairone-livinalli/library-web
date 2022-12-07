import React from 'react';
import { RouterProvider } from 'react-router-dom';

import { UserProvider } from './context/UserContext';
import router from './routes';
import GlobalStyle from './styles';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
      <GlobalStyle />
    </UserProvider>
  );
}

export default App;
