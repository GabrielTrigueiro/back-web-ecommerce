const userModel = require('../models/userModel');

const getAll = async (_request, response) => {
  const users = await userModel.getAll();
  return response.status(200).json(users);
};

const createUser = async (request, response) => {
  const createUser = await userModel.createUser(request.body);
  return response.status(201).json(createUser);
};

const deleteTask = async (request, response) => {
  const { id } = request.params;

  await userModel.deleteTask(id);
  return response.status(204).json();
};

const updateUser = async (request, response) => {
  const { id } = request.params;
  try {
    const updatedUser = await userModel.updateUser(id, request.body);
    response.status(200).json(updatedUser);
  } catch (err) {
    console.error('Erro ao editar usuário', err);
    response.status(500).send('Erro ao editar usuário');
  }
};

module.exports = {
  getAll,
  createUser,
  deleteTask,
  updateUser,
};