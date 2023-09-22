const roleService = require("../services/roleService");
const indexRole = async (req, res) => {
    let data = await roleService.getAllRole();
    return res.json(data);
};
const roleById = async (req, res) => {
    let data = await roleService.getRoleById(req.params.id);
    return res.json(data);
};
module.exports = {
    indexRole,
    roleById
};