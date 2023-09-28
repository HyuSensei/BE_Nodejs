const order_productService = require("../services/order_productService");
const getAllByDESC = async (req, res) => {
    let data = await order_productService.getAllByDESC();
    return res.json(data);
};
module.exports = {
    getAllByDESC
};