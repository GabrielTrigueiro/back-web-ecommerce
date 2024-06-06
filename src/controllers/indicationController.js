const indicationModel = require("../models/indicationModel");

const getAll = async (_request, response) => {
  const users = await indicationModel.getAll();
  return response.status(200).json(users);
};

const createIndication = async (request, response) => {
  const createIndication = await indicationModel.createIndication(request.body);
  return response.status(201).json(createIndication);
};

module.exports = {
  getAll,
  createIndication
};
