class Order {
  constructor(id, items, customerName, address, phoneNumber, status = 'Order Received') {
    this.id = id;
    this.items = items; // Array of {menuItemId, quantity, price}
    this.customerName = customerName;
    this.address = address;
    this.phoneNumber = phoneNumber;
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getTotalPrice() {
    return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}

module.exports = Order;