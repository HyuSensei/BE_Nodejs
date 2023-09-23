const rateService = require("../services/rateService");
const handleRate = async (req, res) => {
  let data = await rateService.rateOrder(req.body);
  return res.json(data);
};

const getRate = (req, res) => {};

module.exports = {
  handleRate,
  getRate,
};
