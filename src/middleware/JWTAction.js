const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models/index");
const userService = require("../services/userService");

//const nonSercurePath = ["/", "/login", "/register", "/products/create"];

const createJWT = (payload) => {
  let token = null;
  let key = process.env.JWT_SECRET;
  try {
    token = jwt.sign(payload, key);
  } catch (error) {
    console.log(error);
  }
  return token;
};

const verifyToken = (token) => {
  let decoded = null;
  let key = process.env.JWT_SECRET;
  let data = null;
  try {
    decoded = jwt.verify(token, key);
    data = decoded;
  } catch (error) {
    console.log(error);
  }
  return data;
};

// const checkLogin = (req, res, next) => {
//   if (nonSercurePath.includes(req.path)) return next();
//   let cookie = req.cookies;
//   if (cookie && cookie.jwt) {
//     let token = cookie.jwt;
//     let decoded = verifyToken(token);
//     if (decoded) {
//       next();
//     } else {
//       return res.json({
//         success: false,
//         message: "Vui lòng đăng nhập !",
//       });
//     }
//   } else {
//     return res.json({
//       success: false,
//       message: "Vui lòng đăng nhập !",
//     });
//   }
// };

const checkLoginUser = async (req, res) => {
  let cookie = req.cookies;
  let erro = req.flash("erro");
  if (cookie && cookie.jwt) {
    let token = cookie.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      res.cookie("UserId", decoded.id, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      let getUser = await userService.detailUser(decoded.id);
      res.cookie("name", getUser.name, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("username", getUser.username, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("phone", getUser.phone, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("email", getUser.email, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("address", getUser.address, {
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.redirect("/");
    } else {
      return res.render("user/login.ejs", { erro });
    }
  } else {
    return res.render("user/login.ejs", { erro });
  }
};

const checkPremission = async (req, res, next) => {
  //if (nonSercurePath.includes(req.path)) return next();
  let cookie = req.cookies;
  let token = cookie.jwt;
  if (!token) {
    return res.render("success.ejs", {
      message: "vui long dang nhap",
      url: "/",
    });
  }
  let decoded = verifyToken(token);
  let idUser = decoded.id;
  let user = await db.User.findOne({
    where: { id: idUser },
    include: {
      model: db.Role,
    },
    raw: true,
    nest: true,
  });
  
  if (user.Role.name === "Admin" || user.Role.name === "SuperAdmin") {
    next();
  } else {
    return res.render("success.ejs", {
      message: "bạn không có quyền truy cập",
      url: "/",
    });
  }
};

const requireLogin = (req, res, next) => {
  let cookie = req.cookies;
  let erro = req.flash("erro");
  if (cookie && cookie.jwt) {
    let token = cookie.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      next();
    }
  } else {
    return res.render("user/login.ejs", { erro });
  }
};

module.exports = {
  createJWT,
  verifyToken,
  checkPremission,
  checkLoginUser,
  requireLogin,
};
