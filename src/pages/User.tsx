import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useUser } from '../hooks/useUser';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 20px;
  gap: 8px;
`;

const UsernameLabel = styled.label`
  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 300px;

  gap: 2px;
`;

const UsernameInput = styled.input`
  padding: 12px;
  border-radius: 8px;

  width: 100%;
  max-width: 300px;
`;

const UsernameButton = styled.button`
  background-color: gold;
  padding: 12px;

  width: 100%;
  max-width: 300px;

  border-radius: 8px;

  :hover {
    opacity: 0.8;
  }
`;

const User = () => {
  const [username, setUsername] = useState('');
  const { saveUsername } = useUser();

  const handleChangeUsername = useCallback((newUsername: string) => {
    setUsername(newUsername);
  }, []);

  const handleClickRegister = useCallback(() => {
    saveUsername({ newUsername: username });
  }, [username]);

  return (
    <Container>
      <UsernameLabel>
        Username
        <UsernameInput
          type="text"
          value={username}
          onChange={(e) => handleChangeUsername(e.target.value)}
        />
      </UsernameLabel>
      <UsernameButton onClick={handleClickRegister}>Register</UsernameButton>
    </Container>
  );
};

export default User;
