const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../models/index");

const nonSercurePath = ["/", "/login", "/register", "/products/create"];

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

const checkLogin = (req, res, next) => {
  if (nonSercurePath.includes(req.path)) return next();
  let cookie = req.cookies;
  if (cookie && cookie.jwt) {
    let token = cookie.jwt;
    let decoded = verifyToken(token);
    if (decoded) {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "Vui lòng đăng nhập !",
      });
    }
  } else {
    return res.status(401).json({
      success: false,
      message: "Vui lòng đăng nhập !",
    });
  }
};

const checkPremission = async (req, res, next) => {
  if (nonSercurePath.includes(req.path)) return next();
  let cookie = req.cookies;
  let token = cookie.jwt;
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
    return res.status(401).json({
      success: false,
      message: "Bạn không có quyền truy cập !",
    });
  }
};

module.exports = { createJWT, verifyToken, checkLogin, checkPremission };
