import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { Book } from '../models/Book';
import { useUser } from '../hooks/useUser';
import BookItem from '../components/BookItem';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  min-height: 100vh;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  gap: 20px;
`;

const ErrorMessage = styled.p`
  text-align: center;
  font-size: 20px;
`;

const ListBooksPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { username } = useUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [nextPage, setNextPage] = useState<string>('');

  useEffect(() => {
    setIsLoading(true);
    setError('');
    const getData = async () => {
      try {
        const data = await fetch('http://gutendex.com/bookss/');

        const { results, next } = await data.json();

        setBooks([...results]);
        setNextPage(next);
      } catch (e) {
        console.error(e);
        setError('Oops, something wrong happened. Please, try again.');
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  const handleBookingClick = useCallback(
    async ({ title, firstAuthor }: { title: string; firstAuthor: string }) => {
      try {
        const response = await fetch('http://localhost:3001/api/bookings', {
          method: 'POST',
          headers: {
            'content-type': 'application/json;charset=UTF-8',
          },
          body: JSON.stringify({
            username,
            title,
            firstAuthor,
          }),
        });

        const { startDate, endDate, message } = await response.json();

        if (message) {
          alert(message);
          return;
        }

        alert(
          `Booking successfully made for user ${username} from ${new Date(
            startDate,
          ).toLocaleDateString('en-GB')} until ${new Date(
            endDate,
          ).toLocaleDateString('en-GB')}`,
        );
      } catch (e) {
        console.error(e);
      }
    },
    [username],
  );

  if (error) {
    return (
      <Container>
        <ErrorMessage>{error}</ErrorMessage>
      </Container>
    );
  }

  return (
    <Container>
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        books.map((book) => (
          <BookItem key={book.id} {...book} onClick={handleBookingClick} />
        ))
      )}
    </Container>
  );
};

export default ListBooksPage;
