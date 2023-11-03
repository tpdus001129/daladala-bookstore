import orderService from "../services/orderService.js";

function requestBodyToObject(body) {
  return {
    recipient: body.recipient,
    books: body.books,
    deliveryPrice: body.deliveryPrice,
  };
}

const orderController = {
  async list(req, res) {
    const { userId } = req.params;
    const orders = await orderService.list(userId);
    res.status(200).json(orders);
  },

  async create(req, res) {
    const { userId } = req.params;
    const orderData = requestBodyToObject(req.body);
    const order = await orderService.create(userId, orderData);
    if (order) {
      res.status(201).send();
    }
  },

  async update(req, res) {
    const { userId, orderId } = req.params;
    const orderData = requestBodyToObject(req.body);
    const order = await orderService.update(userId, orderId, orderData);
    if (order) {
      res.status(200).send();
    }
  },
};

export default orderController;
