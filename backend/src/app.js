const express = require('express');
const cors = require('cors');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'https://food-delivery-9q17ypve7-shamik225s-projects.vercel.app/',
];

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://food-delivery-9q17ypve7-shamik225s-projects.vercel.app/',
    'https://*.vercel.app',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use('/api/menu', menuRoutes);
app.use('/api/orders', orderRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

module.exports = app;