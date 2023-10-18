const db = require("../models/index");
const { Sequelize, DataTypes, Op } = require('sequelize');

const getAllByDESC = async () => {
    try {
        let data = await db.Order_Product.findAll({
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('Order_Product.quantity')), 'sold_quantity'],
            ],
            include: [{
                model: db.Product,
                attributes: ['name'],
            }],
            group: ['product.name'],
            order: [[Sequelize.fn('SUM', Sequelize.col('Order_Product.quantity')), 'DESC']],
        });
        //console.log(data.product.Product.name)
        return {
            success: true,
            message: `tim thanh cong`,
            data: data,
        };
    } catch (error) {
        console.log(error);
    }
};
const getAll = async () => {
    try {
        let data = await db.Order.findAll({
            include: [
                {
                    model: db.Order_Product,
                    include: [{ model: db.Product }],
                },
            ],
        });
        return {
            success: true,
            message: `tim thanh cong`,
            data: data,
        };
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getAllByDESC,
    getAll
};
