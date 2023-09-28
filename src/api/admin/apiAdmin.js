const axios = require("axios");
require("dotenv").config();
function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
const getHome = async (req, res) => {
    try {
        let Statistics = await axios.get(process.env.BASE_URL + `statistics`);
        let statisticsByMonht = await axios.get(process.env.BASE_URL + `statisticsByMonht`);
        let statisticsByYear = await axios.get(process.env.BASE_URL + `statisticsByYear`);
        let order_productDesc = await axios.get(process.env.BASE_URL + `order_product/desc`);
        let categoriesSale = await axios.get(process.env.BASE_URL + `categories/sale`);

        //console.log("Data Statistics:", Statistics.data.data);
        const Monht = formatVND(statisticsByMonht.data.data)
        const Year = formatVND(statisticsByYear.data.data)
        //console.log(categoriesSale.data.categories)
        return res.render("admin/indexAdmin.ejs", 
        { 
            Statistics: Statistics.data.data, 
            statisticsByMonht: Monht, 
            statisticsByYear :Year,
            order_productDesc: order_productDesc.data.data,
            categoriesSale: categoriesSale.data.categories,
        });
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getHome
}