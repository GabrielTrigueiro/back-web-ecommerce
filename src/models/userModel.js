const connection = require('./connection');

// validações

// Função para verificar se o email ou cpf já existem
const checkIfUserExists = async (email, cpf) => {
  try {
    const emailResult = await connection.query('SELECT id FROM public."user" WHERE email = $1', [email]);
    const cpfResult = await connection.query('SELECT id FROM public."user" WHERE cpf = $1', [cpf]);

    if (emailResult.rows.length > 0) {
      return 'email';
    } else if (cpfResult.rows.length > 0) {
      return 'cpf';
    } else {
      return null;
    }
  } catch (err) {
    console.error('Erro ao verificar existência do usuário', err);
    throw err;
  }
};

const getAll = async () => {
  const { rows } = await connection.query('SELECT * FROM public.user'); // PostgreSQL usa query
  return rows;
};

// Função para criar um novo usuário
const createUser = async (user) => {
  const { email, password, name, cpf, street, city, state, zip_code, user_type } = user;
  try {
    const result = await connection.query(
      'INSERT INTO public."user" (email, password, name, cpf, street, city, state, zip_code, user_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *',
      [email, password, name, cpf, street, city, state, zip_code, user_type]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao criar usuário', err);
    throw err;
  }
};

// Função para atualizar um usuário
const updateUser = async (id, user) => {
  const { email, password, name, cpf, street, city, state, zip_code, user_type } = user;
  try {
    const result = await connection.query(
      `UPDATE public."user" 
       SET email = $1, password = $2, name = $3, cpf = $4, street = $5, city = $6, state = $7, zip_code = $8, user_type = $9 
       WHERE id = $10 RETURNING *`,
      [email, password, name, cpf, street, city, state, zip_code, user_type, id]
    );
    return result.rows[0];
  } catch (err) {
    console.error('Erro ao atualizar usuário', err);
    throw err;
  }
};

module.exports = {
  getAll,
  createUser,
  updateUser,
  checkIfUserExists
};
