const userService = require("../services/userService");

const indexUser = (req, res) => {};

const showUser = async (req, res) => {
  let user = await userService.detailUser(req.cookies.UserId);
  return res.render("user/myaccount.ejs", { user });
};

const createUser = () => {};

const storeUser = () => {};

const destroyUser = () => {};

const editUser = () => {};

const updateUser = () => {};

module.exports = {
  indexUser,
  createUser,
  destroyUser,
  showUser,
  storeUser,
  editUser,
  updateUser,
};
