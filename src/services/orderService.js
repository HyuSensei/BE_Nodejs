const db = require("../models/index");

const addOrder = async (cart, userOrder, UserId) => {
  try {
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      total = cart[i].price * cart[i].quantity;
    }
    let payment = "Thanh toán khi nhận hàng";
    let orderInsert = await db.Order.create({
      payment: payment,
      status: 0,
      name: userOrder.name,
      address: userOrder.address,
      phone: userOrder.phone,
      total: total,
      UserId: UserId,
    });
    for (let i = 0; i < cart.length; i++) {
      await db.Order_Product.create({
        ProductId: cart[i].id,
        OrderId: orderInsert.id,
        quantity: cart[i].quantity,
      });
    }
    return {
      success: true,
      message: "Đặt hàng thành công !",
    };
  } catch (error) {
    console.log(error);
  }
};

const getOrderConfirm = async (dataOrder) => {
  try {
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: ["id", "OrderId", "ProductId", "quantity"],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image", "price"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: dataOrder,
        status: 0,
      },
      raw: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getOrderShip = async (dataOrder) => {
  try {
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: ["id", "OrderId", "ProductId", "quantity"],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image", "price"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: dataOrder,
        status: 1,
      },
      raw: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getOrderComplete = async (dataOrder) => {
  try {
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: ["id", "OrderId", "ProductId", "quantity"],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image", "price"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: dataOrder,
        status: 2,
      },
      raw: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const countOrderRate = async (dataCount) => {
  try {
    let countOrder = await db.Order_Product.count({
      where: {
        OrderId: dataCount,
      },
    });
    let countRate = await db.Rate.count({
      where: {
        OrderId: dataCount,
      },
    });
    return {
      OrderId: dataCount,
      countOrder: countOrder,
      countRate: countRate,
    };
  } catch (error) {
    console.log(error);
  }
};

const getOrderAll = async () => {
  try {
    let data = await db.Order.findAll();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const checkMaxOrder = async (dataOrder) => {
  try {
    let data = await db.Order_Product.findOne({
      attributes: ["ProductId"],
      where: { OrderId: dataOrder },
      order: [["id", "DESC"]],
      limit: 1,
      raw: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getOrderRate = async (dataOrder) => {
  try {
    let data = await db.Order.findAll({
      include: [
        {
          model: db.Order_Product,
          attributes: ["id", "OrderId", "ProductId", "quantity"],
          include: [
            {
              model: db.Product,
              attributes: ["name", "image", "price"],
              require: true,
            },
          ],
        },
      ],
      where: {
        UserId: dataOrder.userId,
        id: dataOrder.orderId,
        status: 2,
      },
      raw: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const handleupdate = async (dataUpdate) => {
  try {
    await db.Order.update(
      {
        status: 2,
      },
      {
        where: { id: dataUpdate },
      }
    );
    return {
      success: true,
      message: "Xác nhận đã nhận hàng thành công!",
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  addOrder,
  getOrderConfirm,
  checkMaxOrder,
  getOrderShip,
  getOrderComplete,
  getOrderRate,
  handleupdate,
  countOrderRate,
  getOrderAll,
};
