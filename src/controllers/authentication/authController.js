const authService = require("../../services/authService");

const registerUser = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      !req.body.phone ||
      !req.body.address
    ) {
      return res.json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin đăng ký",
      });
    } else {
      let data = await authService.registerNewUser(req.body);
      return res.json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin đăng nhập",
      });
    } else {
      let data = await authService.handleUserLogin(req.body);
      // res.cookie("UserId", data.user.id, {
      //   maxAge: 24 * 60 * 60 * 1000,
      // });
      res.cookie("jwt", data.token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.json(data);
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.cookie("UserId", "", { maxAge: 0 });
  res.json({
    success: true,
    message: "Đăng xuất thành công !",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
