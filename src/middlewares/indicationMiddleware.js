const indicationModel = require('../models/indicationModel');

const checkRequiredFieldsToRegister = (req, res, next) => {
  const requiredFields = ['codigo', 'cpf', 'desconto', 'email'];
  const missingFields = [];

  requiredFields.forEach(field => {
    if (!req.body[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Campos obrigatórios ausentes: ${missingFields.join(', ')}`
    });
  }

  next();
};

const checkIndicationExists = async (req, res, next) => {
  const { codigo, cpf } = req.body;

  try {
    const existingField = await indicationModel.checkIfIndicationExists(codigo, cpf);

    if (existingField) {
      return res.status(400).json({
        error: `O campo ${existingField} já foi usado.`
      });
    }

    next();
  } catch (err) {
    console.error('Erro ao verificar existência da indicação', err);
    res.status(500).send('Erro ao verificar existência da indicação');
  }
};

module.exports = {
  checkRequiredFieldsToRegister,
  checkIndicationExists
};