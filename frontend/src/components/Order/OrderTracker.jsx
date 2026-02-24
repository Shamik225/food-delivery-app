import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import { useSocket } from '../../hooks/useSocket';

const OrderTracker = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const { status: liveStatus } = useSocket(orderId);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderService.getOrderById(orderId);
        setOrder(response.data);
      } catch (err) {
        console.error('Failed to fetch order');
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // Update order when live status changes
  useEffect(() => {
    if (liveStatus && order) {
      setOrder(prev => ({
        ...prev,
        status: liveStatus.status,
        updatedAt: liveStatus.updatedAt
      }));
    }
  }, [liveStatus]);

  if (loading) return <div>Loading order...</div>;
  if (!order) return <div>Order not found</div>;

  const getStatusStep = (status) => {
    const steps = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];
    return steps.indexOf(status);
  };

  const currentStep = getStatusStep(order.status);

  return (
    <div style={styles.container}>
      <h2>Order #{order.id}</h2>
      
      <div style={styles.orderInfo}>
        <p><strong>Customer:</strong> {order.customerName}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Phone:</strong> {order.phoneNumber}</p>
        <p><strong>Placed:</strong> {new Date(order.createdAt).toLocaleString()}</p>
      </div>

      <div style={styles.items}>
        <h3>Items</h3>
        {order.items.map((item, index) => (
          <div key={index} style={styles.item}>
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div style={styles.total}>
          Total: ${order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
        </div>
      </div>

      <div style={styles.tracker}>
        <h3>Order Status</h3>
        <div style={styles.steps}>
          {['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'].map((step, index) => (
            <div 
              key={step} 
              style={{
                ...styles.step,
                ...(index <= currentStep ? styles.activeStep : {}),
                ...(index === currentStep ? styles.currentStep : {})
              }}
            >
              <div style={styles.stepNumber}>{index + 1}</div>
              <div style={styles.stepLabel}>{step}</div>
              {index < 3 && <div style={styles.connector} />}
            </div>
          ))}
        </div>
        
        <div style={styles.statusBadge}>
          Current Status: <strong>{order.status}</strong>
          {liveStatus && <span style={styles.liveIndicator}>● Live Update</span>}
        </div>
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
  orderInfo: {
    backgroundColor: '#f8f9fa',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  items: {
    marginBottom: '20px'
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    borderBottom: '1px solid #eee'
  },
  total: {
    marginTop: '12px',
    fontWeight: 'bold',
    textAlign: 'right'
  },
  tracker: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    border: '2px solid #eee'
  },
  steps: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
    position: 'relative'
  },
  step: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    opacity: 0.5
  },
  activeStep: {
    opacity: 1
  },
  currentStep: {
    color: '#3498db'
  },
  stepNumber: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#bdc3c7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  stepLabel: {
    fontSize: '12px',
    textAlign: 'center'
  },
  connector: {
    position: 'absolute',
    top: '20px',
    left: '50%',
    width: '100%',
    height: '2px',
    backgroundColor: '#bdc3c7',
    transform: 'translateX(-50%)',
    zIndex: -1
  },
  statusBadge: {
    textAlign: 'center',
    padding: '12px',
    backgroundColor: '#ecf0f1',
    borderRadius: '4px',
    fontSize: '1.1em'
  },
  liveIndicator: {
    color: '#e74c3c',
    marginLeft: '8px',
    fontSize: '0.9em'
  }
};

export default OrderTracker;