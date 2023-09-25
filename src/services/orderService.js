const db = require("../models/index");
const { Sequelize, DataTypes, Op } = require('sequelize');

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
                [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m'), 'thang'],
                [Sequelize.fn('SUM', Sequelize.col('total')), 'tong_thu_nhap'],
            ],
            group: [Sequelize.fn('DATE_FORMAT', Sequelize.col('createdAt'), '%Y-%m')],
        });
        const currentYear = new Date().getFullYear();
        for (let i = 1; i <= 12; i++) {
            const formattedMonth = `${currentYear}-${i.toString().padStart(2, '0')}`;
            const existingData = data.find(row => row.dataValues.thang === formattedMonth);
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

        const arr = []
        //Hiển thị kết quả
        for (const row of data) {
            //console.log(row.dataValues);
            arr.push(row.dataValues)
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
        let data = await db.Order.sum('total', {
            where: {
                createdAt: {
                    [Op.and]: [
                        Sequelize.where(Sequelize.fn('YEAR', Sequelize.col('createdAt')), currentYear),
                        Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('createdAt')), currentMonth),
                    ],
                },
            },
        })
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
        let data = await db.Order.sum('total', {
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
module.exports = {
    getOrder,
    getStatistics,
    getStatisticsByMonht,
    getStatisticsByYear
};
