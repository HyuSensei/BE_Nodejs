const { name } = require("ejs");
const db = require("../models/index");
const { Op } = require("sequelize");

const indexGetProduct = async () => {
  try {
    let data = await db.Product.findAll();
    return {
      success: true,
      message: "Lấy sản phẩm thành công",
      product: data,
    };
  } catch (error) {
    console.log(error);
  }
};

const uploadIMG = async (image) => {
  if (!image) {
    return res
      .status(400)
      .json({ message: "Không có tệp hình ảnh được tải lên." });
  }

  return res
    .status(200)
    .json({ message: "Tệp hình ảnh đã được tải lên thành công." });
};

const storeNewProduct = async (dataStore) => {
  try {
    console.log("data", dataStore);
    nameprd = dataStore.body.name;
    price = dataStore.body.price;
    description = dataStore.body.description;
    quantity = dataStore.body.quantity;
    CategoryId = dataStore.body.CategoryId;

    if (
      nameprd == "" ||
      price == "" ||
      description == "" ||
      quantity == "" ||
      CategoryId == 0
    ) {
      return {
        success: false,
        message: "Vui lòng nhập đầu đủ thông tin !",
      };
    }
    if (typeof dataStore.file == "undefined") {
      return {
        success: false,
        message: "Vui lòng chọn ảnh sản phẩm !",
      };
    }
    image = "/images/products/" + dataStore.file.originalname;
    await db.Product.create({
      name: nameprd,
      image: image,
      price: price,
      description: description,
      quantity: quantity,
      CategoryId: CategoryId,
    });
    return {
      success: true,
      message: "Thêm sản phẩm thành công !",
    };
  } catch (error) {
    console.log(error);
  }
};

const showDetailProduct = async (dataProduct) => {
  try {
    let data = await db.Product.findOne({
      where: { id: dataProduct },
    });
    //console.log('s',data)
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getProductByName = async (name) => {
  try {
    let data = await db.Product.findAll({
      where: {
        name: {
          [Op.like]: `%${name}%`,
        },
      },
    });
    console.log(name)
    if (data.length > 0) {
      return {
        success: true,
        message: `tìm sản phẩm thành công`,
        product: data,
      };
    } else {
      return {
        success: false,
        message: `tìm sản phẩm thất bại`,
        product: data,
      };
    }
  } catch (error) {
    console.log(error);
  }
};
const deleteProduct = async (dataProduct) => {
  try {
    let data = await db.Product.findOne({
      where: { id: dataProduct },
    });
    await data.destroy();
    return {
      success: true,
      message: `xóa sản phẩm thành công`,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: `xóa sản phẩm thất bại`,
    };
  }
};
const updateNewProduct = async (dataProduct) => {
  try {
    console.log("ass", dataProduct);
    await db.Product.update(
      {
        name: dataProduct.name,
        price: dataProduct.price,
        image:
          typeof dataProduct.file != "undefined"
            ? "/images/products/" + dataProduct.file.originalname
            : dataProduct.image,
        description: dataProduct.description,
        quantity: dataProduct.quantity,
        CategoryId: dataProduct.CategoryId,
      },
      {
        where: { id: dataProduct.id },
        returning: true,
      }
    );

    let data = await db.Product.findOne({ where: { id: dataProduct.id } });
    return {
      success: true,
      message: "Update sản phẩm thành công",
      product: data,
    };
  } catch (error) {
    console.log("loi update", error);
  }
};
const countProduct = async (dataProduct) => {
  try {
    let data = await db.Product.count();
    return {
      success: true,
      message: `số lượng sản phẩm là`,
      data: data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: `khong có sản phẩm nào`,
    };
  }
};
const getProductLimit = async (currentPage) => {
  try {
    const limit = 6;
    const offset = (currentPage - 1) * limit;
    let data = await db.Product.findAll({
      limit: limit,
      offset: offset,
    })
    return {
      success: true,
      message: `tìm sản phẩm thành công`,
      product: data,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: `khong có sản phẩm nào`,
    };
  }
};

module.exports = {
  storeNewProduct,
  updateNewProduct,
  indexGetProduct,
  showDetailProduct,
  deleteProduct,
  getProductByName,
  uploadIMG,
  countProduct,
  getProductLimit
};
