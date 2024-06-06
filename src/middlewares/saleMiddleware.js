const userModel = require('../models/userModel');

const checkRequiredFieldsToRegister = (req, res, next) => {
  const requiredFields = ['email', 'password', 'name', 'cpf', 'street', 'city', 'state', 'zip_code', 'user_type'];
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

const checkUserExists = async (req, res, next) => {
  const { email, cpf } = req.body;

  try {
    const existingField = await userModel.checkIfUserExists(email, cpf);

    if (existingField) {
      return res.status(400).json({
        error: `O campo ${existingField} já está em uso.`
      });
    }

    next();
  } catch (err) {
    console.error('Erro ao verificar existência do usuário', err);
    res.status(500).send('Erro ao verificar existência do usuário');
  }
};

module.exports = {
  checkRequiredFieldsToRegister,
  checkUserExists
};