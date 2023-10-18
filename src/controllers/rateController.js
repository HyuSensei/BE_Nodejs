const rateService = require("../services/rateService");
const productService = require("../services/productService");
const handleRate = async (req, res) => {
  if (!req.body.rating || !req.body.comment) {
    return res.json({
      success: false,
      message: "Vui lòng chọn đầy đủ thông tin đánh giá !",
    });
  }
  let data = await rateService.rateOrder(req.body);
  return res.json(data);
};

const getRate = async (req, res) => {
  let productId = req.params.productId;
  let getInfoRate = await rateService.getRateProduct(productId);
  let countRate = await rateService.countRate(productId);
  let countStar = await rateService.countStar(productId);
  let productDetail = await productService.showDetailProduct(productId);
  return res.json({
    success: true,
    message: `Chi tiết san phẩm ${productId}`,
    product: productDetail,
    rate: getInfoRate,
    countRate: countRate,
    countStar: countStar,
  });
};
const getAllCountRate = async (req, res) => {
  let countRate = await rateService.countAllRate();
  return res.json({
    success: true,
    message: `tong so rate la: ${countRate}`,
    countRate: countRate,
  });
};

module.exports = {
  handleRate,
  getRate,
  getAllCountRate
};
