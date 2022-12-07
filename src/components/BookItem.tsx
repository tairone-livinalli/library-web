import React from 'react';
import { GoPerson } from 'react-icons/go';
import { HiLanguage, HiOutlineBookOpen } from 'react-icons/hi2';
import styled from 'styled-components';

import { Book } from '../models/Book';

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

export default BookItem;
