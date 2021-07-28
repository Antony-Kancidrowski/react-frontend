/**
 * Copyright (c) 2021 Antony Kancidrowski
 */

import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');

test('renders Home', () => {
  render(<BrowserRouter basename={baseUrl}><App /></BrowserRouter>);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders The Cake Emporium', () => {
  render(<BrowserRouter basename={baseUrl}><App /></BrowserRouter>);
  const linkElement = screen.getByText(/The Cake Emporium/i);
  expect(linkElement).toBeInTheDocument();
});
