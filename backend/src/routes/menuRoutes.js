const express = require('express');
const router = express.Router();
const menuService = require('../services/menuService');

// GET /api/menu - Get all menu items
router.get('/', (req, res) => {
  try {
    const items = menuService.getAllItems();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/menu/:id - Get specific menu item
router.get('/:id', (req, res) => {
  try {
    const item = menuService.getItemById(req.params.id);
    res.json(item);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;