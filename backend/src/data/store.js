class DataStore {
    
    constructor() {
        this.menuItems = [
            {
                id: 1,
                name: "Margherita Pizza",
                description: "Classic tomato and mozzarella",
                price: 12.99,
                image: "https://images.unsplash.com/photo-1598023696416-0193a0bcd302?q=80&w=1236&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                id: 2,
                name: "Cheeseburger",
                description: "Beef patty with cheese",
                price: 8.99,
                image: "https://images.unsplash.com/photo-1605789538467-f715d58e03f9?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                id: 3,
                name: "Caesar Salad",
                description: "Fresh romaine with Caesar dressing",
                price: 7.99,
                image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                id: 4,
                name: "Spaghetti Carbonara",
                description: "Pasta with pancetta and creamy sauce",
                price: 14.99,
                image: "https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                id: 5,
                name: "Grilled Salmon",
                description: "Salmon fillet with lemon butter",
                price: 18.99,
                image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                id: 6,
                name: "Chocolate Lava Cake",
                description: "Warm chocolate cake with molten center",
                price: 6.99,
                image: "https://images.unsplash.com/photo-1673551490812-eaee2e9bf0ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ];

        this.orders = [];
        this.nextOrderId = 1;
    }

    // Menu methods
    getAllMenuItems() {
        return this.menuItems;
    }

    getMenuItemById(id) {
        return this.menuItems.find(item => item.id === id);
    }

    // Order methods
    getAllOrders() {
        return this.orders;
    }

    getOrderById(id) {
        return this.orders.find(order => order.id === id);
    }

    createOrder(orderData) {
        const order = {
        id: this.nextOrderId++,
        ...orderData,
        status: 'Order Received',
        createdAt: new Date(),
        updatedAt: new Date()
        };
        this.orders.push(order);
        return order;
    }

    updateOrderStatus(id, status) {
        const order = this.getOrderById(id);
        if (order) {
        order.status = status;
        order.updatedAt = new Date();
        return order;
        }
        return null;
    }
}

module.exports = new DataStore();