const axios = require("axios");
const jwt = require("jsonwebtoken");
const userService = require("../../services/userService");

require("dotenv").config();
function formatVND(amount) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
}
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
const getHome = async (req, res) => {
    try {
        let Statistics = await axios.get(process.env.BASE_URL + `statistics`);
        let statisticsByMonht = await axios.get(process.env.BASE_URL + `statisticsByMonht`);
        let statisticsByYear = await axios.get(process.env.BASE_URL + `statisticsByYear`);
        let order_productDesc = await axios.get(process.env.BASE_URL + `order_product/desc`);
        let categoriesSale = await axios.get(process.env.BASE_URL + `categories/sale`);
        let countAllRate = await axios.get(process.env.BASE_URL + `allCountRate`);
        //console.log("rate:", countAllRate.data.countRate);
        const Monht = formatVND(statisticsByMonht.data.data)
        const Year = formatVND(statisticsByYear.data.data)
        //console.log(categoriesSale.data.categories)
        return res.render("admin/indexAdmin.ejs",
            {
                Statistics: Statistics.data.data,
                statisticsByMonht: Monht,
                statisticsByYear: Year,
                order_productDesc: order_productDesc.data.data,
                categoriesSale: categoriesSale.data.categories,
                countAllRate: countAllRate.data.countRate
            });
    } catch (error) {
        console.log(error);
    }
};
const loginAdmin = async (req, res) => {
    let cookie = req.cookies;
    let erro = req.flash("erro");
    if (cookie && cookie.jwtadmin) {
        let token = cookie.jwtadmin;
        let decoded = verifyToken(token);
        if (decoded) {
            res.cookie("adminUserId", decoded.id, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            let getUser = await userService.detailUser(decoded.id);
            res.cookie("adminname", getUser.name, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("adminusername", getUser.username, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("adminphone", getUser.phone, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("adminemail", getUser.email, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("adminaddress", getUser.address, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            return res.redirect("/admin");
        } else {
            return res.render("admin/loginAdmin.ejs", { erro });
        }
    } else {
        return res.render("admin/loginAdmin.ejs", { erro });
    }
}
const handleLoginAdmin = async (req, res) => {
    try {
        let data = await axios.post(process.env.BASE_URL + `loginAdmin`, req.body);
        if (data.data.success == false) {
            req.flash("erro", `${data.data.message}`);
        } else {
            req.flash("success", `${data.data.message}`);
            res.cookie("adminUserId", data.data.user.id, {
                maxAge: 24 * 60 * 60 * 1000,
            });
            res.cookie("jwtadmin", data.data.token, {
                maxAge: 24 * 60 * 60 * 1000,
            });
        }
        console.log(data.data);
        return res.redirect("/loginAdmin");
    } catch (error) {
        console.log(error);
    }
};
module.exports = {
    getHome,
    loginAdmin,
    handleLoginAdmin
}