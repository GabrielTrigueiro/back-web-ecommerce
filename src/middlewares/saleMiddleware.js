const checkRequiredFieldsToRegister = (req, res, next) => {
  const requiredFields = ['valor_total', 'cliente_id', 'indicacao_id', 'num_parcelas'];
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

module.exports = {
  checkRequiredFieldsToRegister
};