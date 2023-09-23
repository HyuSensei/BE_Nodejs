const db = require("../models/index");
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
module.exports = {
    getAllCategories,
    getCategoriesById
};
