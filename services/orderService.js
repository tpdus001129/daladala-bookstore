const orderService = {
  async list(userId) {
    console.log("Order List", userId);
    return [];
  },

  async create(userId, orderData) {
    console.log("Order Create", userId, orderData);
    return true;
  },

  async update(userId, orderId, orderData) {
    console.log("Order Update", userId, orderId, orderData);
    return true;
  },
};

export default orderService;
