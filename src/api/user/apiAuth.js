const axios = require("axios");
const handleRegister = async (req, res) => {
  try {
    let data = await axios.post(
      `http://localhost:8081/api/v1/register`,
      req.body
    );
    console.log(data.data.success);
    if (data.data.success == false) {
      req.flash("erro", `${data.data.message}`);
    } else {
      req.flash("success", "Đăng ký thành công !");
    }
    return res.redirect("/register");
  } catch (error) {
    console.log(error);
  }
};

const handleLogin = async (req, res) => {
  try {
    let data = await axios.post(`http://localhost:8081/api/v1/login`, req.body);
    if (data.data.success == false) {
      req.flash("erro", `${data.data.message}`);
    } else {
      req.flash("success", `${data.data.message}`);
      // res.cookie("UserId", data.data.user.id, {
      //   maxAge: 24 * 60 * 60 * 1000,
      // });
      res.cookie("jwt", data.data.token, {
        maxAge: 24 * 60 * 60 * 1000,
      });
    }
    console.log(data.data);
    return res.redirect("/login");
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleRegister,
  handleLogin,
};
