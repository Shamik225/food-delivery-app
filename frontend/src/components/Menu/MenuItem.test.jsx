import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuItem from './MenuItem';
import { CartProvider } from '../../context/CartContext';

const mockItem = {
  id: 1,
  name: 'Test Pizza',
  description: 'A test pizza',
  price: 10.99,
  image: 'test.jpg'
};

const renderWithProvider = (component) => {
  return render(<CartProvider>{component}</CartProvider>);
};

describe('MenuItem', () => {
  it('renders item details correctly', () => {
    renderWithProvider(<MenuItem item={mockItem} />);
    
    expect(screen.getByText('Test Pizza')).toBeInTheDocument();
    expect(screen.getByText('A test pizza')).toBeInTheDocument();
    expect(screen.getByText('$10.99')).toBeInTheDocument();
  });

  it('allows quantity selection', () => {
    renderWithProvider(<MenuItem item={mockItem} />);
    
    const input = screen.getByDisplayValue('1');
    fireEvent.change(input, { target: { value: '3' } });
    
    expect(input.value).toBe('3');
  });

  it('has add to cart button', () => {
    renderWithProvider(<MenuItem item={mockItem} />);
    
    const button = screen.getByText('Add to Cart');
    expect(button).toBeInTheDocument();
  });
});