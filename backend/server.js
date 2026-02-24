const http = require('http');
const socketIo = require('socket.io');
const app = require('./src/app');
const orderService = require('./src/services/orderService');

const PORT = process.env.PORT || 3001;

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Store io instance for use in routes
app.set('io', io);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  // Join order room for specific order updates
  socket.on('join-order', (orderId) => {
    socket.join(`order-${orderId}`);
    console.log(`Socket ${socket.id} joined order-${orderId}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Simulate order status updates
function simulateOrderProgress(orderId) {
  const statuses = ['Preparing', 'Out for Delivery', 'Delivered'];
  let index = 0;

  const interval = setInterval(async () => {
    if (index >= statuses.length) {
      clearInterval(interval);
      return;
    }

    try {
      const order = orderService.updateStatus(orderId, statuses[index]);
      io.to(`order-${orderId}`).emit('status-update', {
        orderId,
        status: statuses[index],
        updatedAt: order.updatedAt
      });
      console.log(`Order ${orderId} status updated to ${statuses[index]}`);
      index++;
    } catch (error) {
      console.error('Error updating status:', error);
      clearInterval(interval);
    }
  }, 10000); // Update every 10 seconds for demo
}

// Make simulation function available globally
global.simulateOrderProgress = simulateOrderProgress;

// Modify order creation to start simulation
const originalCreateOrder = orderService.createOrder.bind(orderService);
orderService.createOrder = (orderData) => {
  const order = originalCreateOrder(orderData);
  simulateOrderProgress(order.id);
  return order;
};

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { server, io };