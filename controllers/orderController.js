import orderService from "../services/orderService.js";

const orderController = {
  async list(req, res) {
    const orders = await orderService.list();
    res.status(200).json(orders);
  },

  async listByUser(req, res) {
    const { userId } = req.params;
    const orders = await orderService.listByUser(userId);
    res.status(200).json(orders);
  },

  async detail(req, res) {
    const { userId, orderId } = req.params;
    const orders = await orderService.detail(userId, orderId);
    res.status(200).json(orders);
  },

  async create(req, res) {
    const { userId } = req.params;
    const orderData = req.body;
    orderData.user = userId;
    const order = await orderService.create(userId, orderData);
    if (order) {
      res.status(201).send();
    }
  },

  async update(req, res) {
    const { userId, orderId } = req.params;
    const order = await orderService.update(userId, orderId, req.body);
    if (order) {
      res.status(200).json(order);
    }
  },

  async remove(req, res) {
    const { userId, orderId } = req.params;
    const order = await orderService.remove(userId, orderId);
    if (order) {
      res.status(200).json(order);
    }
  },
};

export default orderController;
