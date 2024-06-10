const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const secretKey = process.env.SECRET_KEY;

const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('seu email:', email, 'sua senha:', password);
    console.log('seu secret:', secretKey);
    try {
      const user = await userModel.findUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({ error: 'Email não encontrado' });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Senha incorreta.' });
      }
  
      const token = jwt.sign({ name: user.name, email: user.email }, secretKey, {
        expiresIn: '1h',
      });
  
      return res.status(200).json({ token });
    } catch (err) {
      console.error('Erro ao fazer login', err);
      return res.status(500).json({ error: 'Erro ao fazer login' });
    }
  };

  module.exports = {
    login,
  };