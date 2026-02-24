const express = require('express');
const router = express.Router();
const orderService = require('../services/orderService');

// GET /api/orders - Get all orders
router.get('/', (req, res) => {
  try {
    const orders = orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/orders/:id - Get specific order
router.get('/:id', (req, res) => {
  try {
    const order = orderService.getOrderById(req.params.id);
    res.json(order);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// POST /api/orders - Create new order
router.post('/', (req, res) => {
  try {
    const order = orderService.createOrder(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/orders/:id/status - Update order status
router.put('/:id/status', (req, res) => {
  try {
    const { status } = req.body;
    const order = orderService.updateStatus(req.params.id, status);
    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;