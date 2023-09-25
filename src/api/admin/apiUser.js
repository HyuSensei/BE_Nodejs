const axios = require("axios");
require("dotenv").config();
const getUserHome = async (req, res) => {
    try {
        let dataUser = await axios.get(process.env.BASE_URL + `users`);
        //console.log("Data:", dataUser.data.dataUser);
        let data = dataUser.data.dataUser
        return res.render("admin/userAdmin.ejs", {
            dataUser: data,
        });
    } catch (error) {
        console.log(error);
    }
};
const getUserByUserName = async (req, res) => {
    try {
        let userName = req.body.username
        console.log(userName)
        let dataUser = await axios.post(process.env.BASE_URL + `users/?username=${userName}`);
        console.log("Data tim kirm:", dataUser.data);
        let data = dataUser.data.dataUser
        if (data.length===0){
            return res.render("admin/userAdmin.ejs", {
                message: `không tìn thấy người dùng có username: ${userName}`,
                nameSearch: userName,
            });
        }
        return res.render("admin/userAdmin.ejs", {
            dataUser: data,
            nameSearch: userName,
        });
    } catch (error) {
        console.log(error);
    }
};
const deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        console.log(req.cookies.UserId)
        
        if (id == req.cookies.UserId) {
            return res.render('success.ejs', { message: "bạn không thể xóa chính tài khoản của mình được", url: '/admin/user/' })
        }
        let data = await axios.delete(process.env.BASE_URL + `/users/${id}`);
        if (data.data.success !== false) {
            return res.render('success.ejs', { message: "xóa người dùng thành công", url: '/admin/user/' })
        } else {
            return res.render('success.ejs', { message: "xóa người dùng thất bại", url: '/admin/user/' })
        }
    } catch (error) {
        console.log("Error:", error);
    }
};
const getUpdateUser = async (req, res) => {
    try {
        let id = req.params.id;
        let dataUser = await axios.get(process.env.BASE_URL + `users/${id}`);
        let getRole = await axios.get(process.env.BASE_URL + `role`);
        Role = getRole.data.Role
        data = dataUser.data
        return res.render("admin/editUser.ejs", { dataUser: data, Role: Role })
        
    } catch (error) {
        console.log("Error:", error);
    }
}
const UpdateUser = async (req, res) => {
    try {
        //console.log(req.body)
        let dataUser = await axios.post(process.env.BASE_URL + `users/update`, req.body);
        //console.log(dataUser.data.dataUser)
        if (dataUser.data.success !== false) {
            return res.render('success.ejs', { message: "sửa thông tin người dùng thành công", url: `/admin/user/update/${dataUser.data.dataUser.id}` })
        } else {
            return res.render('success.ejs', { message: "sửa thông tin người dùng thất bại", url: `/admin/user/update/${dataUser.data.dataUser.id}` })
        }
       
        
    } catch (error) {
        console.log("Error:", error);
    }
}
module.exports = {
    getUserHome,
    deleteUser,
    getUserByUserName,
    getUpdateUser,
    UpdateUser
}