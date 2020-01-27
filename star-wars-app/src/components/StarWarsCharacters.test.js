import React from 'react';
import { render, fireEvent, wait } from '@testing-library/react';
import { getData as mockGetData } from '../api';
import StarWarsCharacters from './StarWarsCharacters';

jest.mock(`../api`);

test(`Renders Next and previous buttons to query the API for the next or previous data sets`, async () => {
  mockGetData.mockResolvedValueOnce({
    id: 1,
    next: 'https://swapi.co/api/people/?page=2',
    results: [
      {
        name: 'Luke Skywalker',
        url: 'test'
      }
    ]
  });

  const { getByText } = render(<StarWarsCharacters />);

  const prevBtn = getByText(/previous/i);
  const nextBtn = getByText(/next/i);

  fireEvent.click(prevBtn);
  fireEvent.click(nextBtn);

  expect(mockGetData).toHaveBeenCalledTimes(1);

  wait(() => expect(getByText(/test/i)));
});

test('test test', () => {});
