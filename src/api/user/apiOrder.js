const axios = require("axios");

const order = async (req, res) => {
  try {
    let dataOrder = {
      UserId: req.cookies.UserId,
      user: req.body,
      cart: req.session.cart,
    };
    let data = await axios.post(
      `http://localhost:8081/api/v1/order`,
      dataOrder
    );
    if (data.data.success !== false) {
      req.session.cart = null;
      req.flash("success", `${data.data.message}`);
    } else {
      req.flash("erro", `${data.data.message}`);
    }
    console.log(data.data);
    return res.redirect("/viewCart");
  } catch (error) {
    console.log(error);
  }
};

const getOrderConfirm = async (req, res) => {
  try {
    let UserId = req.params.UserId;
    let data = await axios.get(
      `http://localhost:8081/api/v1/orderConfirm/${UserId}`
    );
    if (data.data.success !== false) {
      return res.render("user/order_wait.ejs", {
        orders: data.data.order,
        lastProduct: data.data.lastProduct,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrderShip = async (req, res) => {
  try {
    let UserId = req.params.UserId;
    let data = await axios.get(
      `http://localhost:8081/api/v1/orderShip/${UserId}`
    );
    if (data.data.success !== false) {
      return res.render("user/order_ship.ejs", {
        orders: data.data.order,
        lastProduct: data.data.lastProduct,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrderComplete = async (req, res) => {
  try {
    let UserId = req.params.UserId;
    let data = await axios.get(
      `http://localhost:8081/api/v1/orderComplete/${UserId}`
    );
    if (data.data.success !== false) {
      return res.render("user/order_complete.ejs", {
        orders: data.data.order,
        lastProduct: data.data.lastProduct,
        countCheck: data.data.countCheck,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const getOrderRate = async (req, res) => {
  try {
    let erro = req.flash("erro");
    let userId = req.params.userId;
    let orderId = req.params.orderId;
    let data = await axios.get(
      `http://localhost:8081/api/v1/orderRate/${userId}/${orderId}`
    );
    console.log("CheckRated:", data.data.checkRated);
    if (data.data.success === true) {
      return res.render("user/rate.ejs", {
        orders: data.data.orders,
        checkRated: data.data.checkRated,
        countCheck: data.data.countCheck,
        erro,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const updateStatusOrder = async (req, res) => {
  try {
    let userId = req.cookies.UserId;
    let orderId = req.params.orderId;
    let data = await axios.get(
      `http://localhost:8081/api/v1/updateStatusOrder/${orderId}`
    );
    if (data.data.success === true) {
      return res.redirect(`/orderShip/${userId}`);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  order,
  getOrderConfirm,
  getOrderShip,
  getOrderComplete,
  getOrderRate,
  updateStatusOrder,
};
