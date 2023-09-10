const db = require("../models/index");

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
const storeNewProduct = async (dataStore) => {
  try {
    await db.Product.create({
      name: dataStore.name,
      image: dataStore.image,
      price: dataStore.price,
      description: dataStore.description,
      quantity: dataStore.quantity,
      CategoryId: dataStore.CategoryId,
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
      where: dataProduct.id,
    });
    return {
      success: true,
      message: `Chi tiết sản phẩm id=${data.id}`,
      product: data,
    };
  } catch (error) {
    console.log(error);
  }
};
const updateNewProduct = async (dataProduct) => {
  try {
    await db.Product.update(
      {
        name: dataProduct.name,
        image: dataProduct.image,
        price: dataProduct.price,
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
    console.log(error);
  }
};

module.exports = {
  storeNewProduct,
  updateNewProduct,
  indexGetProduct,
  showDetailProduct,
};
