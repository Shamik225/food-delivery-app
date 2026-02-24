import React from 'react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartSummary = () => {
  const { cartItems, getCartTotal, updateQuantity, removeFromCart, getItemCount } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div style={styles.empty}>
        <h2>Your Cart is Empty</h2>
        <button onClick={() => navigate('/')} style={styles.button}>
          Browse Menu
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2>Your Cart ({getItemCount()} items)</h2>
      
      {cartItems.map(item => (
        <div key={item.menuItemId} style={styles.item}>
          <div style={styles.itemInfo}>
            <h4>{item.name}</h4>
            <p>${item.price.toFixed(2)} each</p>
          </div>
          
          <div style={styles.controls}>
            <button 
              onClick={() => updateQuantity(item.menuItemId, item.quantity - 1)}
              style={styles.quantityBtn}
            >
              -
            </button>
            <span style={styles.quantity}>{item.quantity}</span>
            <button 
              onClick={() => updateQuantity(item.menuItemId, item.quantity + 1)}
              style={styles.quantityBtn}
            >
              +
            </button>
            <button 
              onClick={() => removeFromCart(item.menuItemId)}
              style={styles.removeBtn}
            >
              Remove
            </button>
          </div>
          
          <div style={styles.itemTotal}>
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}
      
      <div style={styles.footer}>
        <h3>Total: ${getCartTotal().toFixed(2)}</h3>
        <button 
          onClick={() => navigate('/checkout')}
          style={styles.checkoutBtn}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px'
  },
  empty: {
    textAlign: 'center',
    padding: '40px'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px',
    borderBottom: '1px solid #eee',
    gap: '12px',
    flexWrap: 'wrap'
  },
  itemInfo: {
    flex: 2
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1
  },
  quantityBtn: {
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    cursor: 'pointer'
  },
  quantity: {
    minWidth: '30px',
    textAlign: 'center'
  },
  removeBtn: {
    marginLeft: '8px',
    padding: '4px 8px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    cursor: 'pointer'
  },
  itemTotal: {
    flex: 1,
    textAlign: 'right',
    fontWeight: 'bold'
  },
  footer: {
    marginTop: '20px',
    textAlign: 'right'
  },
  checkoutBtn: {
    padding: '12px 24px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  button: {
    padding: '12px 24px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default CartSummary;