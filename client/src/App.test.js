import { render, screen } from '@testing-library/react';
import App from './App';



test('renders Header text', () => {
  render(<App />);
  const headingText = screen.getByText(/Grocery Item/i);
  expect(headingText).toBeInTheDocument();
});

test('renders table data on search', () => {
   
    render(<App />);
    
    // select the Search and click on Search
    const headingText = screen.getByText(/Grocery Item/i);
    expect(headingText).toBeInTheDocument();
  });



