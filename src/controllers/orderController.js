const orderService = require("../services/orderService");
const rateService = require("../services/rateService");

const handleOrder = async (req, res) => {
  let cart = req.body.cart;
  if (cart.length === 0) {
    return res.json({
      success: false,
      message: "Vui lòng thêm sản phẩm vào giỏ hàng để đặt hàng !",
    });
  } else {
    if (
      !req.body.user.name ||
      !req.body.user.phone ||
      !req.body.user.address ||
      !req.body.user.method
    ) {
      return res.json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin đặt hàng !",
      });
    } else {
      if (req.body.user.method === "orderoff") {
        let data = await orderService.addOrder(
          cart,
          req.body.user,
          req.body.UserId
        );
        return res.json(data);
      }
    }
  }
};

const orderConfirm = async (req, res) => {
  let listLastProduct = [];
  let lastProduct = null;
  let data = await orderService.getOrderConfirm(req.params.UserId);
  for (const itemOrder of data) {
    let checkOrderProduct = await orderService.checkMaxOrder(itemOrder.id);
    if (checkOrderProduct.ProductId === itemOrder["Order_Products.ProductId"]) {
      lastProduct = itemOrder["Order_Products.ProductId"];
      listLastProduct.push(lastProduct);
    }
  }
  return res.json({
    success: true,
    order: data,
    lastProduct: listLastProduct,
  });
};

const orderShip = async (req, res) => {
  let listLastProduct = [];
  let lastProduct = null;
  let data = await orderService.getOrderShip(req.params.UserId);
  for (const itemOrder of data) {
    let checkOrderProduct = await orderService.checkMaxOrder(itemOrder.id);
    if (checkOrderProduct.ProductId === itemOrder["Order_Products.ProductId"]) {
      lastProduct = itemOrder["Order_Products.ProductId"];
      listLastProduct.push(lastProduct);
    }
  }
  return res.json({
    success: true,
    order: data,
    lastProduct: listLastProduct,
  });
};

const orderComplete = async (req, res) => {
  let listLastProduct = [];
  let lastProduct = null;
  let data = await orderService.getOrderComplete(req.params.UserId);
  for (const itemOrder of data) {
    let checkOrderProduct = await orderService.checkMaxOrder(itemOrder.id);
    if (checkOrderProduct.ProductId === itemOrder["Order_Products.ProductId"]) {
      lastProduct = itemOrder["Order_Products.ProductId"];
      listLastProduct.push(lastProduct);
    }
  }
  return res.json({
    success: true,
    order: data,
    lastProduct: listLastProduct,
  });
};

const viewRateOrder = async (req, res) => {
  let dataOrder = {
    userId: req.params.userId,
    orderId: req.params.orderId,
  };
  let data = await orderService.getOrderRate(dataOrder);
  let checkRatedData = [];
  for (const item of data) {
    let dataCheck = {
      ProductId: item["Order_Products.ProductId"],
      OrderId: item.id,
    };
    let result = await rateService.checkRated(dataCheck);
    checkRatedData.push(...result);
  }
  return res.json({
    success: true,
    orders: data,
    checkRated: checkRatedData,
  });
};

const updateStatus = async (req, res) => {
  let data = await orderService.handleupdate(req.params.orderId);
  return res.json(data);
};

module.exports = {
  handleOrder,
  orderConfirm,
  orderShip,
  orderComplete,
  viewRateOrder,
  updateStatus,
};
