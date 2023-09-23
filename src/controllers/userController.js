const userService = require("../services/userService");

const indexUser = (req, res) => {};

const showUser = async (req, res) => {
  let user = await userService.detailUser(req.cookies.UserId);
  return res.render("user/myaccount.ejs", { user });
};

const createUser = () => {};

const searchByUserName = async (req, res) => {
  let data = await userService.searchByUserName(req.query.username);
  return res.json(data);
};

const destroyUser = async (req, res) => {
  let data = await userService.deleteUser(req.params.id);
  return res.json(data);
};

const editUser = () => {};

const updateUser = async (req, res) => {
  let data = await userService.updateNewUser(req.body);
  return res.json(data);
};

module.exports = {
  indexUser,
  createUser,
  destroyUser,
  showUser,
  searchByUserName,
  editUser,
  updateUser,
};
