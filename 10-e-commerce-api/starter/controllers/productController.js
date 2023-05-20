const createProduct = async (req, res) => {
  res.send('CREATE PRODUCT');
};
const getAllProducts = async (req, res) => {
  res.send('GET ALL PRODUCT');
};
const getSingleProduct = async (req, res) => {
  res.send('GET SINGLE PRODUCT');
};
const updateProduct = async (req, res) => {
  res.send('UPDATE PRODUCT');
};
const deleteProduct = async (req, res) => {
  res.send('DELETE PRODUCT');
};
const uploadImage = async (req, res) => {
  res.send('UPLOAD PRODUCT IMAGE');
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
