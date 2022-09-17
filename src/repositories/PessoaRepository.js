const { query } = require("../database");
const { v4: uuid } = require('uuid')

class PessoaRepository {
  async criar({
    cpf, nome_completo, telefone, email, 
    data_nascimento, sexo, cliente
  }) {

    const [row] = await query(`
      INSERT INTO pessoa (id, cpf, nome_completo, telefone, email, data_nascimento, sexo, cliente)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
      `, 
    [uuid(), cpf, nome_completo, telefone, email, data_nascimento, sexo, cliente]);

    return row;
  }

  async buscarPorCPF(cpf) {
    const [row] = await query(`
      SELECT * FROM pessoa where cpf = $1
    `, [cpf]);

    return row;
  }

  async buscarPorEmail(email) {
    const [row] = await query(`
    SELECT * FROM pessoa where email = $1
    `, [email]);

    return row;
  }
}

module.exports = new PessoaRepository();