const store = require('../data/store');

class OrderService {

    getAllOrders() {
        return store.getAllOrders();
    }

    getOrderById(id) {
        const order = store.getOrderById(parseInt(id));
        if (!order) {
            throw new Error('Order not found');
        }
        return order;
    }

    createOrder(orderData) {
    // Validation
    if (!orderData.items || orderData.items.length === 0) {
      throw new Error('Order must contain at least one item');
    }
    if (!orderData.customerName || !orderData.address || !orderData.phoneNumber) {
      throw new Error('Customer details are required');
    }

    // Validate items exist and calculate prices
    const validatedItems = orderData.items.map(item => {
      const menuItem = store.getMenuItemById(item.menuItemId);
      if (!menuItem) {
        throw new Error(`Menu item ${item.menuItemId} not found`);
      }
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        price: menuItem.price,
        name: menuItem.name
      };
    });

    const order = store.createOrder({
      ...orderData,
      items: validatedItems
    });

    return order;
  }

  updateStatus(id, status) {
    const validStatuses = ['Order Received', 'Preparing', 'Out for Delivery', 'Delivered'];
    if (!validStatuses.includes(status)) {
      throw new Error('Invalid status');
    }

    const order = store.updateOrderStatus(parseInt(id), status);
    if (!order) {
      throw new Error('Order not found');
    }
    return order;
  }

}

module.exports = new OrderService();