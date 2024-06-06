const connection = require("./connection");

const makeSale = async (sale) => {
  const { valor_total, cliente_id, indicacao_id, num_parcelas } = sale;
  try {
    const result = await connection.query(
      "INSERT INTO public.compra (valor_total, cliente_id, indicacao_id, num_parcelas) VALUES ($1, $2, $3, $4) RETURNING *",
      [valor_total, cliente_id, indicacao_id, num_parcelas]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Erro ao criar indicacao", err);
    throw err;
  }
};

const getSalesByUserId = async (userId) => {
  try {
    console.log(`Buscando compras para o usuário com ID: ${userId}`);
    const result = await connection.query(
      "SELECT * FROM public.compra WHERE cliente_id = $1",
      [userId]
    );
    console.log(`Compras encontradas: ${JSON.stringify(result.rows)}`);
    return result.rows;
  } catch (err) {
    console.error("Erro ao obter compras do usuário", err);
    throw err;
  }
};

module.exports = {
    makeSale,
    getSalesByUserId
};
