import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Book } from '../models/Book';

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
  flex-direction: column;
  width: 100%;

  text-align: center;
  border-radius: 8px;
  border: 1px solid white;

  padding: 20px;
`;

const BookItem: React.FC<Book> = ({ title, languages, authors }) => (
  <BookContainer>
    <p>{title}</p>
    <p>{languages}</p>
    {authors.map((author) => (
      <p key={author.name}>{author.name}</p>
    ))}
  </BookContainer>
);

const ListBooksPage: React.FC = () => {
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

  return (
    <Container>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </Container>
  );
};

export default ListBooksPage;
