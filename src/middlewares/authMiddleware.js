const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log('testando o secret:', secretKey);
  
  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  // Extrai o token, removendo o prefixo "Bearer "
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }
  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

module.exports = {
    authenticateToken
};
