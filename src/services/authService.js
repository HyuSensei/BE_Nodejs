const db = require("../models/index");
const bcrypt = require("bcrypt");
const JWTAction = require("../middleware/JWTAction");

const checkEmail = async (emailUser) => {
  let user = await db.User.findOne({
    where: { email: emailUser },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const checkPhone = async (phoneUser) => {
  let user = await db.User.findOne({
    where: { phone: phoneUser },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const checkUserName = async (userName) => {
  let user = await db.User.findOne({
    where: { username: userName },
  });
  if (user) {
    return true;
  } else {
    return false;
  }
};

const checkPassword = async (password, hashedPassword) => {
  const checkPass = await bcrypt.compare(password, hashedPassword);
  return checkPass;
};

const registerNewUser = async (dataRegister) => {
  try {
    let isEmailExit = await checkEmail(dataRegister.email);
    let isPhoneExit = await checkPhone(dataRegister.phone);
    let isUserName = await checkUserName(dataRegister.username);
    if (isEmailExit == true) {
      return {
        success: false,
        message: "Email đã tồn tại !",
      };
    }
    if (isPhoneExit == true) {
      return {
        success: false,
        message: "Số điện thoại đã tồn tại !",
      };
    }
    if (isUserName == true) {
      return {
        success: false,
        message: "Tên đăng nhập đã tồn tại !",
      };
    }
    const hashedPassword = await bcrypt.hash(dataRegister.password, 10);
    await db.User.create({
      name: dataRegister.name,
      email: dataRegister.email,
      username: dataRegister.username,
      password: hashedPassword,
      phone: dataRegister.phone,
      address: dataRegister.address,
      RoleId: 3,
    });
    return {
      success: true,
      message: "Đăng ký thành công !",
    };
  } catch (error) {
    console.log(error);
  }
};

const handleUserLogin = async (dataLogin) => {
  try {
    let user = await db.User.findOne({
      where: { username: dataLogin.username },
    });
    if (!user) {
      return {
        success: false,
        message: "Tên đăng nhập không tồn tại !",
      };
    } else {
      let isPasswordExit = await checkPassword(
        dataLogin.password,
        user.password
      );
      if (!isPasswordExit) {
        return {
          success: false,
          message: "Mật khẩu không đúng vui lòng kiểm tra lại !",
        };
      } else {
        let dataUser = {
          id: user.id,
          name: user.name,
        };
        let userRes = {
          id: user.id,
          name: user.name,
          username: user.username,
          phone: user.phone,
          address: user.address,
        };
        let token = JWTAction.createJWT(dataUser);
        return {
          success: true,
          message: "Đăng nhập thành công !",
          token: token,
          user: userRes,
        };
      }
    }
  } catch (error) {
    console.log(error);
  }
};
const handleUserLoginAdmin = async (dataLogin) => {
  try {
    let user = await db.User.findOne({
      where: { username: dataLogin.username },
      include: {
        model: db.Role,
      },
      raw: true,
      nest: true,
    });
    if (!user) {
      return {
        success: false,
        message: "Tên đăng nhập không tồn tại !",
      };
    } else {
      let isPasswordExit = await checkPassword(
        dataLogin.password,
        user.password
      );
      if (!isPasswordExit) {
        return {
          success: false,
          message: "Mật khẩu không đúng vui lòng kiểm tra lại !",
        };
      } else {
        
        //console.log(user)
        if (user.Role.name === "Admin" || user.Role.name === "SuperAdmin") {
          let dataUser = {
            id: user.id,
            name: user.name,
          };
          let userRes = {
            id: user.id,
            name: user.name,
            username: user.username,
            phone: user.phone,
            address: user.address,
          };
          let token = JWTAction.createJWT(dataUser);
          return {
            success: true,
            message: "Đăng nhập thành công !",
            token: token,
            user: userRes,
          };
        } else {
          return {
            success: false,
            message: "Tài khoản của bạn không có quyền truy cập trang admin !",
          };
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  registerNewUser,
  handleUserLogin,
  handleUserLoginAdmin
};
