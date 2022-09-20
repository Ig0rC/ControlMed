const PessoaUseCase = require("../useCases/PessoaUseCase");
const PessoaRepository = require("../repositories/PessoaRepository");
const EnderecoRepository = require("../repositories/EnderecoRepository");
const ClienteEndereco = require("../repositories/ClienteEndereco");

class ClienteController {
  async criar(request, response) {
    try {
      const {
        cpf,
        nome_completo,
        telefone,
        email,
        data_nascimento,
        sexo,
        cliente,
        bairro,
        cep,
        cidade,
        complemento,
        logradouro,
        numero,
        uf,
      } = request.body;

      const respostaValidacao = PessoaUseCase([
        {
          key: "email",
          value: email,
        },
        {
          key: "cpf",
          value: cpf,
        },
        {
          key: "nomeCompleto",
          value: nome_completo,
        },
        {
          key: "telefone",
          value: telefone,
        },
        {
          key: "sexo",
          value: sexo,
        },
        {
          key: "cliente",
          value: cliente,
        },
        {
          key: "dataNascimento",
          value: data_nascimento,
        },
      ]);



      if (respostaValidacao !== "") {
        return response.status(400).json(respostaValidacao);
      }

      const existeCPF = await PessoaRepository.buscarPorCPF(cpf);

      if (existeCPF) {
        return response.status(400).json("Cliente existente!");
      }

      const existeEmail = await PessoaRepository.buscarPorEmail(email);

      if (existeEmail) {
        return response.status(400).json("Email já cadastrado!");
      }

      const dadosPessoais = await PessoaRepository.criar({
        cliente,
        cpf,
        data_nascimento,
        email,
        nome_completo,
        sexo,
        telefone,
      });

      const endereco = await EnderecoRepository.criar({
        bairro,
        cep,
        cidade,
        complemento,
        logradouro,
        numero,
        uf,
      });

      await ClienteEndereco.criar({
        id_cliente: dadosPessoais.id,
        id_endereco: endereco.id,
      }) 

      delete endereco.id;

      return response.status(201).json({
        ...dadosPessoais,
        ...endereco,
      });
    } catch (error) {
      console.log(error);
    }
  }

  buscar() {}

  atualizar() {}

  listar() {}
}

module.exports = new ClienteController();
