const checkRequiredFieldsToRegister = (req, res, next) => {
  const requiredFields = [
    "nome",
    "descricao",
    "preco",
    "estoque",
    "img",
    "categoria",
  ];
  const missingFields = [];

  requiredFields.forEach((field) => {
    if (!req.body[field]) {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    return res.status(400).json({
      error: `Campos obrigatórios ausentes: ${missingFields.join(", ")}`,
    });
  }

  next();
};

module.exports = {
  checkRequiredFieldsToRegister,
};
