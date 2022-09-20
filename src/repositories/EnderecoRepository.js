const { query } = require("../database");
const { v4: uuid } = require('uuid')

class EnderecoRepository {
  async criar({
    cep, logradouro, complemento, bairro, cidade, numero, uf
  }) {
    const [row] = await query(`
      INSERT INTO endereco (id, cep, logradouro, complemento, bairro, cidade, numero, uf)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `, 
    [uuid(), cep, logradouro, complemento, bairro, cidade, numero, uf]);

    return row;
  }
}

module.exports = new EnderecoRepository();