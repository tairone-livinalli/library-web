import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { HiLanguage } from 'react-icons/hi2';
import { GoPerson } from 'react-icons/go';

import { Book } from '../models/Book';
import { useUser } from '../hooks/useUser';

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

const BookContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  width: 100%;

  text-align: center;
  border-radius: 8px;
  border: 1px solid white;

  padding: 20px;
`;

const BookInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  width: 100%;

  text-align: center;
  border-radius: 8px;

  padding: 20px;
`;

const BookContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 4px;
`;

const BookingButton = styled.button`
  width: 100%;
  max-width: 200px;
  border-radius: 8px;

  padding: 20px;
  margin-left: auto;
`;

interface BookItemProps extends Book {
  onClick({ title, firstAuthor }: { title: string; firstAuthor: string }): void;
}

const BookItem: React.FC<BookItemProps> = ({
  title,
  languages,
  authors,
  onClick,
}) => (
  <BookContainer>
    <BookInfo>
      <BookContent>
        <HiOutlineBookOpen size={20} />
        <p>{title}</p>
      </BookContent>
      <BookContent>
        <HiLanguage size={20} />
        <p>{languages}</p>
      </BookContent>
      {authors.map((author) => (
        <BookContent key={author.name}>
          <GoPerson size={20} />
          <p>{author.name}</p>
        </BookContent>
      ))}
    </BookInfo>
    <BookingButton
      onClick={() => onClick({ title, firstAuthor: authors[0].name })}
    >
      Make a Booking
    </BookingButton>
  </BookContainer>
);

const ListBooksPage: React.FC = () => {
  const { username } = useUser();
  const [books, setBooks] = useState<Book[]>([]);
  const [nextPage, setNextPage] = useState<string>('');

  useEffect(() => {
    const getData = async () => {
      const data = await fetch('http://gutendex.com/books/');

      const { results, next } = await data.json();

      setBooks([...results]);
      setNextPage(next);
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

  return (
    <Container>
      {books.map((book) => (
        <BookItem key={book.id} {...book} onClick={handleBookingClick} />
      ))}
    </Container>
  );
};

export default ListBooksPage;
