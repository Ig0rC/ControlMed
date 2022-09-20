const { query } = require("../database");
const { v4: uuid } = require('uuid')

class ClienteEndereco {
  async criar({
    id_cliente,
    id_endereco,
  }) {
    console.log(id_cliente, id_endereco)
    const [row] = await query(`
      INSERT INTO cliente_endereco (id, id_cliente, id_endereco)
      VALUES($1, $2, $3)
      RETURNING *
    `, 
    [uuid(), id_cliente, id_endereco]);

    return row;
  }
}




module.exports = new ClienteEndereco();