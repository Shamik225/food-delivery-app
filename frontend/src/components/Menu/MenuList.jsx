import React, { useEffect, useState } from 'react';
import MenuItem from './MenuItem';
import { menuService } from '../../services/menuService';

const MenuList = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await menuService.getAllItems();
        setItems(response.data);
      } catch (err) {
        setError('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={styles.container}>
      <h2>Our Menu</h2>
      <div style={styles.grid}>
        {items.map(item => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px'
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px'
  }
};

export default MenuList;