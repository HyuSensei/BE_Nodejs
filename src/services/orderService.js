const db = require("../models/index");
const { Sequelize, DataTypes, Op } = require("sequelize");

const getOrder = async (id) => {
  try {
    //console.log(id)
    let data = await db.Order.findAll();
    return {
      success: true,
      message: `Tim thanh cong`,
      data: data,
    };
  } catch (error) {
    console.log(error);
  }
};
const getStatistics = async (id) => {
  try {
    //console.log(id)
    let data = await db.Order.findAll({
      attributes: [
        [
          Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m"),
          "thang",
        ],
        [Sequelize.fn("SUM", Sequelize.col("total")), "tong_thu_nhap"],
      ],
      group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%Y-%m")],
    });
    const currentYear = new Date().getFullYear();
    for (let i = 1; i <= 12; i++) {
      const formattedMonth = `${currentYear}-${i.toString().padStart(2, "0")}`;
      const existingData = data.find(
        (row) => row.dataValues.thang === formattedMonth
      );
      if (!existingData) {
        data.push({
          dataValues: {
            thang: formattedMonth,
            tong_thu_nhap: 0,
          },
        });
      }
    }
    // Sắp xếp kết quả theo tháng
    data.sort((a, b) => (a.dataValues.thang > b.dataValues.thang ? 1 : -1));

    const arr = [];
    //Hiển thị kết quả
    for (const row of data) {
      //console.log(row.dataValues);
      arr.push(row.dataValues);
    }

    return {
      success: true,
      message: `Tim thanh cong`,
      data: arr,
    };
  } catch (error) {
    console.log(error);
  }
};
const getStatisticsByMonht = async () => {
  try {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    let data = await db.Order.sum("total", {
      where: {
        createdAt: {
          [Op.and]: [
            Sequelize.where(
              Sequelize.fn("YEAR", Sequelize.col("createdAt")),
              currentYear
            ),
            Sequelize.where(
              Sequelize.fn("MONTH", Sequelize.col("createdAt")),
              currentMonth
            ),
          ],
        },
      },
    });
    return {
      success: true,
      message: `Tim thanh cong`,
      data: data,
    };
  } catch (error) {
    console.log(error);
  }
};
const getStatisticsByYear = async () => {
  try {
    const currentYear = new Date().getFullYear();
    let data = await db.Order.sum("total", {
      where: {
        createdAt: {
          [Op.between]: [`${currentYear}-01-01`, `${currentYear}-12-31`],
        },
      },
    });
    return {
      success: true,
      message: `Tim thanh cong`,
      data: data,
    };
  } catch (error) {
    console.log(error);
  }
};

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

const handConfirm = async (dataUpdate) => {
  try {
    await db.Order.update(
      {
        status: 1,
      },
      {
        where: { id: dataUpdate },
      }
    );
    return {
      success: true,
      message: "Xác nhận giao hàng!",
    };
  } catch (error) {
    console.log(error);
  }
};
const deleteOrder = async (dataDelete) => {
  try {
    await db.Order.destroy(
      {
        where: { id: dataDelete },
      }
    );
    return {
      success: true,
      message: "Xóa thành công!",
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getOrder,
  getStatistics,
  getStatisticsByMonht,
  getStatisticsByYear,
  addOrder,
  getOrderConfirm,
  checkMaxOrder,
  getOrderShip,
  getOrderComplete,
  getOrderRate,
  handleupdate,
  countOrderRate,
  getOrderAll,
  handConfirm,
  deleteOrder
};
