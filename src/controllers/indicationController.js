const indicationModel = require("../models/indicationModel");

const getAll = async (_request, response) => {
  const users = await indicationModel.getAll();
  return response.status(200).json(users);
};

const createIndication = async (request, response) => {
  const createIndication = await indicationModel.createIndication(request.body);
  return response.status(201).json(createIndication);
};

const getByCode = async (req, res) => {
  const { codigo } = req.params;
  try {
    const indication = await indicationModel.getIndicationByCode(codigo);
    if (indication) {
      res.status(200).json(indication);
    } else {
      res.status(404).json({ message: 'Indicação não encontrada' });
    }
  } catch (err) {
    console.error('Erro ao buscar indicação pelo código:', err);
    res.status(500).json({ error: 'Erro ao buscar indicação pelo código' });
  }
};

module.exports = {
  getAll,
  createIndication,
  getByCode
};
