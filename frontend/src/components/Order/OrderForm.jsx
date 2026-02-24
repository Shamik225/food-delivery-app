import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { orderService } from '../../services/orderService';
import { useNavigate } from 'react-router-dom';

const OrderForm = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    customerName: '',
    address: '',
    phoneNumber: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const orderData = {
        items: cartItems.map(item => ({
          menuItemId: item.menuItemId,
          quantity: item.quantity
        })),
        ...formData
      };

      const response = await orderService.createOrder(orderData);
      clearCart();
      navigate(`/track-order/${response.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to place order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Checkout</h2>
      
      <div style={styles.summary}>
        <h3>Order Summary</h3>
        {cartItems.map(item => (
          <div key={item.menuItemId} style={styles.summaryItem}>
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div style={styles.total}>
          <strong>Total: ${getCartTotal().toFixed(2)}</strong>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="customerName">Full Name *</label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="address">Delivery Address *</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="phoneNumber">Phone Number *</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={styles.submitBtn}
        >
          {isSubmitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px'
  },
  summary: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  summaryItem: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px'
  },
  total: {
    marginTop: '12px',
    paddingTop: '12px',
    borderTop: '2px solid #ddd',
    fontSize: '1.2em'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px'
  },
  input: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px'
  },
  textarea: {
    padding: '8px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '16px',
    minHeight: '80px',
    resize: 'vertical'
  },
  error: {
    color: '#e74c3c',
    padding: '8px',
    backgroundColor: '#fadbd8',
    borderRadius: '4px'
  },
  submitBtn: {
    padding: '12px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer'
  }
};

export default OrderForm;