const db = require("../models/index");

const getAllUser = () => {};

const detailUser = async (dataUser) => {
  try {
    let data = await db.User.findOne({
      where: { id: dataUser },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const createNewUser = () => {};

const updateNewUser = () => {};

const deleteUser = () => {};

module.exports = {
  getAllUser,
  detailUser,
  createNewUser,
  updateNewUser,
  deleteUser,
};
