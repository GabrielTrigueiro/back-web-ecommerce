const productModel = require('../models/produtcModel');

const getAll = async (_request, response) => {
  const users = await productModel.getAll();
  return response.status(200).json(users);
};

const createProcut = async (request, response) => {
  const createProduct = await productModel.createProduct(request.body);
  return response.status(201).json(createProduct);
};

const updateProduct = async (request, response) => {
  const { id } = request.params;
  try {
    const updateProduct = await productModel.createProduct(id, request.body);
    response.status(200).json(updateProduct);
  } catch (err) {
    console.error('Erro ao editar produto', err);
    response.status(500).send('Erro ao editar produto');
  }
};

module.exports = {
  getAll,
  createProcut,
  updateProduct
};