const connection = require("./connection");

// Função para verificar se o código ou cpf já existem
const checkIfIndicationExists = async (codigo, cpf) => {
  try {
    const codigoResult = await connection.query('SELECT id FROM public.indicacao WHERE codigo = $1', [codigo]);
    const cpfResult = await connection.query('SELECT id FROM public.indicacao WHERE cpf = $1', [cpf]);

    if (codigoResult.rows.length > 0) {
      return 'código';
    } else if (cpfResult.rows.length > 0) {
      return 'cpf';
    } else {
      return null;
    }
  } catch (err) {
    console.error('Erro ao verificar existência da indicação', err);
    throw err;
  }
};

const getAll = async () => {
  const { rows } = await connection.query("SELECT * FROM public.indicacao");
  return rows;
};

const createIndication = async (indication) => {
    const { codigo, cpf, desconto, email } = indication;
    try {
      const result = await connection.query(
        'INSERT INTO public.indicacao (codigo, cpf, desconto, email) VALUES ($1, $2, $3, $4) RETURNING *',
        [codigo, cpf, desconto, email]
      );
      return result.rows[0];
    } catch (err) {
      console.error('Erro ao criar indicacao', err);
      throw err;
    }
  };

  module.exports = {
    getAll,
    createIndication,
    checkIfIndicationExists
  }