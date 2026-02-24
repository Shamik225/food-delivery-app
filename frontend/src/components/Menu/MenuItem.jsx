import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';

const MenuItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setQuantity(1);
    alert(`${item.name} added to cart!`);
  };

  return (
    <div className="menu-item" style={styles.card}>
      <img src={item.image} alt={item.name} style={styles.image} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p style={styles.price}>${item.price.toFixed(2)}</p>
      
      <div style={styles.controls}>
        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          style={styles.input}
        />
        <button onClick={handleAddToCart} style={styles.button}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    margin: '8px',
    maxWidth: '300px'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px'
  },
  price: {
    fontWeight: 'bold',
    color: '#2ecc71',
    fontSize: '1.2em'
  },
  controls: {
    display: 'flex',
    gap: '8px',
    marginTop: '8px'
  },
  input: {
    width: '60px',
    padding: '4px'
  },
  button: {
    flex: 1,
    padding: '8px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default MenuItem;