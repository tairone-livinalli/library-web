import { useContext } from 'react';
import { UserContext, UserContextData } from '../context/UserContext';

const useUser = (): UserContextData => {
  const context = useContext(UserContext);

  return context;
};

export { useUser };
