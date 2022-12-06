import React from 'react';
import { UserProvider } from './context/UserContext';
import ListBooksPage from './pages/ListBooksPage';

import GlobalStyle from './styles';

function App() {
  return (
    <UserProvider>
      <ListBooksPage />
      <GlobalStyle />
    </UserProvider>
  );
}

export default App;
