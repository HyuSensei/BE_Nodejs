const db = require("../models/index");
const { Op } = require("sequelize");
const getAllUser = async () => {
  try {
    let dataUser = await db.User.findAll();
    return {
      success: true,
      message: "Lấy thông tin user thành công",
      dataUser: dataUser,
    };
  } catch (erro) {
    console.log("loi get all user:", erro);
  }
};

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

const updateNewUser = async (dataUser) => {
  try {
    //console.log("api",dataUser)
    await db.User.update(
      {
        name: dataUser.name,
        email: dataUser.email,
        password: dataUser.password,
        phone: dataUser.phone,
        RoleId: dataUser.RoleId,
      },
      {
        where: {
          id: dataUser.id,
        },
      }
    );
    let data = await db.User.findOne({ where: { id: dataUser.id } });
    return {
      success: true,
      message: "cập nhật thông tin người dùng thành công",
      dataUser: data,
    };
  } catch (erro) {
    console.log("err ud user", erro);
  }
};
const searchByUserName = async (userName) => {
  try {
    let data = await db.User.findAll({
      where: {
        username: {
          [Op.like]: `%${userName}%`,
        },
      },
    });
    return {
      success: true,
      message: "tìm thấy người dùng",
      dataUser: data,
    };
  } catch (erro) {
    console.log("loi xóa user:", erro);
  }
};
const deleteUser = async (userIdToDelete) => {
  try {
    await db.User.destroy({
      where: {
        id: userIdToDelete,
      },
    });
    return {
      success: true,
      message: "Lấy xóa user thành công",
    };
  } catch (erro) {
    console.log("loi xóa user:", erro);
  }
};

module.exports = {
  getAllUser,
  detailUser,
  createNewUser,
  updateNewUser,
  deleteUser,
  searchByUserName,
};
