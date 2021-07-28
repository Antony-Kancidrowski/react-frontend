/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

test('renders learn react link', () => {
  render(<BrowserRouter basename={baseUrl}><App /></BrowserRouter>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
