const db = require("../models/index");
const { Sequelize, DataTypes, Op } = require('sequelize');

const getCategoriesById = async (id) => {
    try {
        let data = await db.Category.findOne({
            where: { id: id },
        });
        return {
            success: true,
            message: `danh mục id=${data.id}`,
            categories: data,
        };
    } catch (error) {
        console.log(error);
    }
};
const getAllCategories = async () => {
    try {
        let data = await db.Category.findAll();
        return {
            success: true,
            message: `tim thanh cong`,
            categories: data,
        };
    } catch (error) {
        console.log(error);
    }
};
const getCategoriesSale = async () => {
    try {
        let data = await db.Category.findAll({
            attributes: [
                'name',
                [Sequelize.fn('COALESCE', Sequelize.fn('COUNT', Sequelize.col('Products.id')), 0), 'sold_count'],
            ],
            include: [
                {
                    model: db.Product,
                    attributes: [], // We only need to count products, no need to retrieve their attributes
                    include: [
                        {
                            model: db.Order_Product,
                            attributes: [], // We only need to count order_products, no need to retrieve their attributes
                        },
                    ],
                },
            ],
            group: ['Category.name'],
            order: [['id', 'ASC']],
        })
        return {
            success: true,
            message: `tim thanh cong`,
            categories: data,
        };
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getAllCategories,
    getCategoriesById,
    getCategoriesSale
};
