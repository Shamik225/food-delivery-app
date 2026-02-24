const request = require('supertest');
const app = require('../src/app');

describe('Order API', () => {
  let createdOrderId;

  describe('POST /api/orders', () => {
    it('should create a new order with valid data', async () => {
      const orderData = {
        items: [
          { menuItemId: 1, quantity: 2 },
          { menuItemId: 2, quantity: 1 }
        ],
        customerName: 'John Doe',
        address: '123 Main St',
        phoneNumber: '555-1234'
      };

      const response = await request(app)
        .post('/api/orders')
        .send(orderData)
        .expect(201);

      createdOrderId = response.body.id;
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('status', 'Order Received');
      expect(response.body.items).toHaveLength(2);
    });

    it('should return 400 for missing customer details', async () => {
      const invalidData = {
        items: [{ menuItemId: 1, quantity: 1 }]
        // missing customerName, address, phoneNumber
      };

      await request(app)
        .post('/api/orders')
        .send(invalidData)
        .expect(400);
    });

    it('should return 400 for empty items array', async () => {
      const invalidData = {
        items: [],
        customerName: 'John',
        address: '123 Main',
        phoneNumber: '555-1234'
      };

      await request(app)
        .post('/api/orders')
        .send(invalidData)
        .expect(400);
    });

    it('should return 400 for invalid menu item', async () => {
      const invalidData = {
        items: [{ menuItemId: 999, quantity: 1 }],
        customerName: 'John',
        address: '123 Main',
        phoneNumber: '555-1234'
      };

      await request(app)
        .post('/api/orders')
        .send(invalidData)
        .expect(400);
    });
  });

  describe('GET /api/orders', () => {
    it('should return all orders', async () => {
      const response = await request(app)
        .get('/api/orders')
        .expect(200);
      
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('GET /api/orders/:id', () => {
    it('should return a specific order', async () => {
      const response = await request(app)
        .get(`/api/orders/${createdOrderId}`)
        .expect(200);
      
      expect(response.body).toHaveProperty('id', createdOrderId);
    });

    it('should return 404 for non-existent order', async () => {
      await request(app)
        .get('/api/orders/999')
        .expect(404);
    });
  });

  describe('PUT /api/orders/:id/status', () => {
    it('should update order status', async () => {
      const response = await request(app)
        .put(`/api/orders/${createdOrderId}/status`)
        .send({ status: 'Preparing' })
        .expect(200);
      
      expect(response.body).toHaveProperty('status', 'Preparing');
    });

    it('should return 400 for invalid status', async () => {
      await request(app)
        .put(`/api/orders/${createdOrderId}/status`)
        .send({ status: 'Invalid Status' })
        .expect(400);
    });
  });
});