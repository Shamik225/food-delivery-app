# 🍕 Food Delivery Order Management System

Full-stack food delivery app with real-time order tracking.

## 🛠 Tech Stack

**Backend**: Node.js, Express, Socket.io, Jest  
**Frontend**: React, Vite, Socket.io-client, Vitest

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Shamik225/food-delivery-app.git
cd food-delivery-app

# Start backend
cd backend
npm install
npm run dev        # http://localhost:3001

# Start frontend (new terminal)
cd frontend
npm install
npm run dev        # http://localhost:5173
```
# 📁 Project Structure
- frontend/
  - src/
  - tests/
  - server.js
- backend/
  - src/
  - tests/
- README.md

# ✨ Features
- Browse menu items with cart functionality
- Place orders with customer details
- Real-time order status tracking (WebSocket)
- Automated status simulation (Received → Preparing → Out for Delivery → Delivered)

# 🧪 Testing

``` bash
# For backend test
cd backend && npm test

# For frontend test
cd frontend && npm test
```

#📡 API Endpoints
| Method | Endpoint                 | Description     |
| ------ | ------------------------ | --------------- |
| GET    | `/api/menu`              | List menu items |
| POST   | `/api/orders`            | Create order    |
| GET    | `/api/orders/:id`        | Get order       |
| PUT    | `/api/orders/:id/status` | Update status   |

# 🔌 WebSocket Events
- join-order: Subscribe to order updates
- status-update: Receive status changes
