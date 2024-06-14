const connection = require("./connection");

const makeSale = async (sale) => {
    const {valor_total, cliente_id, indicacao_id, num_parcelas, produtos} = sale;

    // Iniciar uma transação
    const client = await connection.connect();
    try {
        await client.query('BEGIN');

        // Inserir a compra
        const result = await client.query(
            "INSERT INTO public.compra (valor_total, cliente_id, indicacao_id, num_parcelas) VALUES ($1, $2, $3, $4) RETURNING *",
            [valor_total, cliente_id, indicacao_id, num_parcelas]
        );
        const compraId = result.rows[0].id;

        // Inserir os produtos associados à compra
        const insertProductPromises = produtos.map(async (produto) => {
            const {produto_id, quantidade} = produto;
            await client.query(
                "INSERT INTO public.compra_produto (compra_id, produto_id, quantidade) VALUES ($1, $2, $3)",
                [compraId, produto_id, quantidade]
            );
        });

        await Promise.all(insertProductPromises);

        // Finalizar a transação
        await client.query('COMMIT');

        return result.rows[0];
    } catch (err) {
        await client.query('ROLLBACK');
        console.error("Erro ao criar a compra", err);
        throw err;
    } finally {
        client.release();
    }
};

const getSalesByUserId = async (userId) => {
    try {
        console.log(`Buscando compras para o usuário com ID: ${userId}`);

        const result = await connection.query(
            `SELECT c.*, cp.produto_id, cp.quantidade 
       FROM public.compra c
       LEFT JOIN public.compra_produto cp ON c.id = cp.compra_id
       WHERE c.cliente_id = $1`,
            [userId]
        );

        // Agrupar os resultados por compra
        const sales = result.rows.reduce((acc, row) => {
            const {
                id, valor_total, cliente_id, indicacao_id, num_parcelas, produto_id, quantidade
            } = row;

            const sale = acc.find(s => s.id === id);
            if (sale) {
                sale.produtos.push({produto_id, quantidade});
            } else {
                acc.push({
                    id, valor_total, cliente_id, indicacao_id, num_parcelas,
                    produtos: [{produto_id, quantidade}]
                });
            }

            return acc;
        }, []);

        console.log(`Compras encontradas: ${JSON.stringify(sales)}`);
        return sales;
    } catch (err) {
        console.error("Erro ao obter compras do usuário", err);
        throw err;
    }
};


module.exports = {
    makeSale,
    getSalesByUserId
};
