import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { useCart } from './context/CartContext';
import MenuPage from './pages/MenuPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderTrackingPage from './pages/OrderTrackingPage';

const Navigation = () => {
  const { getItemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.navContainer}>
        <Link to="/" style={styles.logo}>Food Delivery</Link>
        <button style={styles.menuButton} onClick={toggleMenu} aria-label="Toggle menu">
          <span style={styles.menuIcon}>{isMenuOpen ? '✕' : '☰'}</span>
        </button>
      </div>
      <div style={{
        ...styles.linksContainer,
        ...(isMenuOpen ? styles.linksContainerOpen : {})
      }}>
        <Link to="/" style={styles.link} onClick={() => setIsMenuOpen(false)}>Menu</Link>
        <Link to="/cart" style={styles.link} onClick={() => setIsMenuOpen(false)}>
          Cart ({getItemCount()})
        </Link>
      </div>
    </nav>
  );
};

function App() {
  return (
    <CartProvider>
      <Router>
        <div style={styles.app}>
          <Navigation />
          <main style={styles.main}>
            <Routes>
              <Route path="/" element={<MenuPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/track-order/:orderId" element={<OrderTrackingPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

const styles = {
  app: {
    fontFamily: 'Verdana, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  nav: {
    backgroundColor: '#2c3e50',
    marginBottom: '20px'
  },
  navContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 20px'
  },
  logo: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '20px',
    fontWeight: 'bold'
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
    padding: '5px'
  },
  menuIcon: {
    display: 'block'
  },
  linksContainer: {
    display: 'flex',
    gap: '20px',
    padding: '0 20px 20px 20px'
  },
  linksContainerOpen: {
    display: 'flex'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px'
  },
  main: {
    padding: '0 20px'
  }
};

// Add responsive styles via CSS
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @media (max-width: 768px) {
    .nav-links-container {
      flex-direction: column;
      gap: 15px;
    }
  }
  
  @media (max-width: 480px) {
    .app-nav {
      flex-direction: column;
      align-items: flex-start;
    }
    
    .nav-links-container {
      width: 100%;
      padding: 10px 0;
    }
  }
`;
document.head.appendChild(styleSheet);

export default App;
