const store = require('../data/store');

class MenuService {
  getAllItems() {
    return store.getAllMenuItems();
  }

  getItemById(id) {
    const item = store.getMenuItemById(parseInt(id));
    if (!item) {
      throw new Error('Menu item not found');
    }
    return item;
  }
}

module.exports = new MenuService();