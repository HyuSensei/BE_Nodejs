const categoryService = require("../services/categoriesService");
const indexCategory = async (req, res) => {
    let data = await categoryService.getAllCategories();
    return res.json(data);
};
module.exports = {
   indexCategory
};