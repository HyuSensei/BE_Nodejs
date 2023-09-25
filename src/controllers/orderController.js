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
module.exports = {
    indexOrder,
    getStatistics,
    getStatisticsByMonht,
    getStatisticsByYear
};