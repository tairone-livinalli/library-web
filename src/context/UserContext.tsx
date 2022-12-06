import React, { createContext, useCallback, useState } from 'react';

interface SaveUsernameParams {
  newUsername: string;
}

export interface UserContextData {
  username: string;
  saveUsername(params: SaveUsernameParams): void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface UserContextProps {
  children: React.ReactNode;
}

const UserProvider: React.FC<UserContextProps> = ({ children }) => {
  const [username, setUsername] = useState(() => {
    const localUsername = localStorage.getItem('@MyLibrary:username');

    return localUsername || '';
  });

  const saveUsername = useCallback(({ newUsername }: SaveUsernameParams) => {
    if (!newUsername) throw new Error('Invalid username');

    localStorage.setItem('@MyLibrary:usernamen', newUsername);
    setUsername(newUsername);
  }, []);

  return (
    <UserContext.Provider value={{ username, saveUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
