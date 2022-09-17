const PessoaUseCase = require('../useCases/PessoaUseCase');
const PessoaRepository = require('../repositories/PessoaRepository')

class ClienteController {
  async criar(request, response) {
    try {
      let error = '';

      const { 
        cpf, nome_completo, telefone, email, 
        data_nascimento, sexo, cliente } = request.body;
        
      const respostaValidacao = PessoaUseCase([{
        key: 'email',
        value: email,
      }, {
        key: 'cpf',
        value: cpf,
      }, {
        key: 'nomeCompleto',
        value: nome_completo
      }, {
        key: 'telefone',
        value: telefone,
      }, {
        key: 'sexo',
        value: sexo,
      }, {
        key: 'cliente',
        value: cliente
      }, {
        key: 'dataNascimento',
        value: data_nascimento,
      }]);

      if(respostaValidacao !== '') {
        return response.status(400).json(respostaValidacao)
      }


      const existeCPF = await PessoaRepository.buscarPorCPF(cpf);

      if(existeCPF) {
        return response.status(400).json('Cliente existente!')
      }

      const existeEmail = await PessoaRepository.buscarPorEmail(email);

      if(existeEmail) {
        return response.status(400).json('Email já cadastrado!')
      }


      const resultQuery = await PessoaRepository.criar({
        cliente,
        cpf,
        data_nascimento,
        email,
        nome_completo,
        sexo,
        telefone
      });


      response.status(201).json(resultQuery)
    } catch (error) {
      console.log(error, 'teste')
    }
  };

  buscar() {}
  
  atualizar() {}

  listar() {}
}

module.exports = new ClienteController();

