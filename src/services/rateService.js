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

const countRate = async (dataRate) => {
  try {
    let data = await db.Rate.count({
      where: { ProductId: dataRate },
    });
    console.log("So luot danh gia:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getRateProduct = async (dataRate) => {
  try {
    let data = await db.Rate.findAll({
      include: {
        model: db.User,
        require: true,
        attributes: ["name"],
      },
      where: {
        ProductId: dataRate,
      },
    });
    console.log("Data rate:", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const countStar = async (dataRate) => {
  try {
    let one_star = await db.Rate.count({
      col: "ProductId",
      where: {
        ProductId: dataRate,
        star: 1,
      },
    });
    let two_star = await db.Rate.count({
      where: {
        ProductId: dataRate,
        star: 2,
      },
    });
    let three_star = await db.Rate.count({
      where: {
        ProductId: dataRate,
        star: 3,
      },
    });
    let four_star = await db.Rate.count({
      where: {
        ProductId: dataRate,
        star: 4,
      },
    });
    let fine_star = await db.Rate.count({
      where: {
        ProductId: dataRate,
        star: 5,
      },
    });
    let countStar = {
      one: one_star,
      two: two_star,
      three: three_star,
      four: four_star,
      fine: fine_star,
    };
    console.log("Data count star:", countStar);
    return countStar;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  rateOrder,
  getRateProduct,
  checkRated,
  countRate,
  countStar,
};
