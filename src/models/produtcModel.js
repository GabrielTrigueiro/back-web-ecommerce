const connection = require('./connection');

const fs = require('fs');
const path = require('path');

// Função para salvar a imagem localmente
const saveImageLocally = (base64Image, imageName) => {
  const buffer = Buffer.from(base64Image, 'base64');
  const imagesDir = path.join(__dirname, '..', 'images');
  const imagePath = path.join(imagesDir, imageName);

  fs.writeFileSync(imagePath, buffer);
  return `/images/${imageName}`;
};


const getAll = async () => {
  const { rows } = await connection.query('SELECT * FROM public.produto');
  return rows;
};

// Função para criar um novo produto
const createProduct = async (product) => {
  const { nome, descricao, preco, estoque, img } = product;
  try {
    const imageName = `${nome}-${Date.now()}.jpg`;
    const img_url = saveImageLocally(img, imageName);

    const result = await connection.query(
      'INSERT INTO public.produto (nome, descricao, preco, estoque, img) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome, descricao, preco, estoque, img_url]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao criar produto', err);
    throw err;
  }
}; 

// Função para atualizar um produto
const updateProduct = async (id, product) => {
  const { nome, descricao, preco, estoque, img } = product;
  try {

    const imageName = `${nome}-${Date.now()}.jpg`;
    const img_url = saveImageLocally(img, imageName);

    const result = await connection.query(
      'UPDATE public.produto SET nome = $1, descricao = $2, preco = $3, estoque = $4, img = $5 WHERE id = $6 RETURNING *',
      [nome, descricao, preco, estoque, img, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar produto', err);
    throw err;
  }
};

module.exports = {
  getAll,
  createProduct,
  updateProduct,
};
