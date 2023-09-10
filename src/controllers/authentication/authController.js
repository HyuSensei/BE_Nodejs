const authService = require("../../services/authService");

const registerUser = async (req, res) => {
  try {
    if (
      !req.body.name ||
      !req.body.username ||
      !req.body.email ||
      !req.body.password ||
      !req.body.phone
    ) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin đăng ký",
      });
    } else {
      let data = await authService.registerNewUser(req.body);
      return res.status(200).json({
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: "Vui lòng điền đầy đủ thông tin đăng nhập",
      });
    } else {
      let data = await authService.handleUserLogin(req.body);
      res.cookie("jwt", data.token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({
        data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const logoutUser = (req, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({
    success: true,
    message: "Đăng xuất thành công !",
  });
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
