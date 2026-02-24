import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import OrderForm from './OrderForm';
import { CartProvider } from '../../context/CartContext';

const renderWithProviders = (component) => {
  return render(
    <BrowserRouter>
      <CartProvider>
        {component}
      </CartProvider>
    </BrowserRouter>
  );
};

describe('OrderForm', () => {
  it('renders checkout form with all fields', () => {
    renderWithProviders(<OrderForm />);
    
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/delivery address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
  });

  it('shows order summary', () => {
    renderWithProviders(<OrderForm />);
    
    expect(screen.getByText(/order summary/i)).toBeInTheDocument();
  });

  it('has place order button', () => {
    renderWithProviders(<OrderForm />);
    
    expect(screen.getByRole('button', { name: /place order/i })).toBeInTheDocument();
  });
});