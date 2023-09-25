const db = require("../models/index");
const rateOrder = async (dataRate) => {
  try {
    let data = await db.Rate.create({
      ProductId: dataRate.ProductId,
      UserId: dataRate.UserId,
      OrderId: dataRate.OrderId,
      star: dataRate.rating,
      comment: dataRate.comment,
    });
    let infoRate = {
      ProductId: data.ProductId,
      UserId: data.UserId,
      OrderId: data.OrderId,
      star: data.star,
      comment: data.comment,
    };
    return {
      success: true,
      message: "Đánh giá sản phẩm thành công!",
      rate: infoRate,
    };
  } catch (error) {
    console.log(error);
  }
};

const checkRated = async (dataCheck) => {
  try {
    let data = await db.Rate.findAll({
      where: {
        ProductId: dataCheck.ProductId,
        OrderId: dataCheck.OrderId,
      },
      raw: true,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRateProduct = () => {};

module.exports = {
  rateOrder,
  getRateProduct,
  checkRated,
};
