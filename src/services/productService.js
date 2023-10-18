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

const getProductCategory = async (page) => {
  try {
    if (page <= 0) {
      return {
        success: false,
        message: `Không tìm thấy sản phẩm`,
      };
    }
    const product_page = 2;

    let { count, rows } = await db.Product.findAndCountAll({
      offset: (page - 1) * product_page,
      limit: product_page,
    });
    const totalPages = Math.ceil(count / product_page);
    if (page == "" || page > totalPages) {
      return {
        success: false,
        message: `Không tìm thấy sản phẩm`,
      };
    }
    return {
      success: true,
      product: rows,
      countPage: totalPages,
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
        name: dataProduct.body.name,
        price: dataProduct.body.price,
        image:
          typeof dataProduct.file != "undefined"
            ? "/images/products/" + dataProduct.file.originalname
            : dataProduct.body.image,
        description: dataProduct.body.description,
        quantity: dataProduct.body.quantity,
        CategoryId: dataProduct.body.CategoryId,
      },
      {
        where: { id: dataProduct.body.id },
        returning: true,
      }
    );

    let data = await db.Product.findOne({ where: { id: dataProduct.body.id } });
    return {
      success: true,
      message: "Update sản phẩm thành công",
      product: data,
    };
  } catch (error) {
    console.log("loi update", error);
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
  getProductCategory,
};
