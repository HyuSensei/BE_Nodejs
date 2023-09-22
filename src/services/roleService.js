const db = require("../models/index");
const getRoleById = async (id) => {
    try {
        //console.log(id)
        let data = await db.Role.findOne({
            where: { id: id },
        });
        return {
            success: true,
            message: `Role id=${data.id}`,
            Role: data,
        };
    } catch (error) {
        console.log(error);
    }
};
const getAllRole = async () => {
    try {
        let data = await db.Role.findAll();
        return {
            success: true,
            message: `tim thanh cong`,
            Role: data,
        };
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getAllRole,
    getRoleById
};
