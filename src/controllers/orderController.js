const orderService = require("../services/orderService");
const indexOrder = async (req, res) => {
  let data = await orderService.getOrder();
  return res.json(data);
};
const getStatistics = async (req, res) => {
  let data = await orderService.getStatistics();
  return res.json(data);
};
const getStatisticsByMonht = async (req, res) => {
  let data = await orderService.getStatisticsByMonht();
  return res.json(data);
};
const getStatisticsByYear = async (req, res) => {
  let data = await orderService.getStatisticsByYear();
  return res.json(data);
};

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
      } else {
        return res.json({
          success: false,
          message: "Hiện tại website SkinLeLe chưa hỗ trợ thanh toán VNPAY",
        });
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
  let listCount = [];
  let lastProduct = null;
  let data = await orderService.getOrderComplete(req.params.UserId);
  let dataOrderAll = await orderService.getOrderAll();
  for (const itemOrderAll of dataOrderAll) {
    let count = await orderService.countOrderRate(itemOrderAll.id);
    listCount.push(count);
  }
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
    countCheck: listCount,
  });
};

const viewRateOrder = async (req, res) => {
  let listCount = [];
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
  let dataOrderAll = await orderService.getOrderAll();
  for (const itemOrderAll of dataOrderAll) {
    let count = await orderService.countOrderRate(itemOrderAll.id);
    listCount.push(count);
  }
  return res.json({
    success: true,
    orders: data,
    checkRated: checkRatedData,
    countCheck: listCount,
  });
};

const updateStatus = async (req, res) => {
  let data = await orderService.handleupdate(req.params.orderId);
  return res.json(data);
};
const handConfirm = async (req, res) => {
  //console.log(req.params.orderId)
  let data = await orderService.handConfirm(req.params.orderId);
  return res.json(data);
};
const deleteOrder = async (req, res) => {
  //console.log(req.params.orderId)
  let data = await orderService.deleteOrder(req.params.orderId);
  return res.json(data);
};
module.exports = {
  handleOrder,
  orderConfirm,
  orderShip,
  orderComplete,
  viewRateOrder,
  updateStatus,
  indexOrder,
  getStatistics,
  getStatisticsByMonht,
  getStatisticsByYear,
  handConfirm,
  deleteOrder
};
