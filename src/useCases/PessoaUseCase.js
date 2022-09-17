const isEmailValid = require("../utils/isEmailValid");
const { cpf } = require('cpf-cnpj-validator');

function ValidatorPessoa(key, value) {
  let error = '';

  switch(key) {
    case 'email': 
      const isValidEmail = isEmailValid(value);
      error = !isValidEmail ? 'Email é inválido' : '';
    break;

    case 'cpf': 
      const isCPFValid = cpf.isValid(value);
      error = !isCPFValid ? 'CPF é inválido' : ''
    break;

    case 'nomeCompleto': 
      if(value.length > 80) {
        error = 'Nome deve ser menor que 80 caracteres';
      } else if(value.length < 1) {
        error = 'Nome deve ser informador.';
      }
    break;

    case 'telefone': 
      const isTelefoneValid = value.length < 11 || value.length > 11 ? 'Telefone é inválido' : '';
      error = isTelefoneValid;
    break;

    case 'sexo': 
      const isSexoValid = value.length < 0 || value.length > 1 ? 'Sexo só pode M = Masculino, F = Feminino ou O = Outros' : '';
      error = isSexoValid;
    break;
    
    case 'cliente':
      const isClientValid = typeof value !== 'boolean' ? 'Cliente dever ser do tipo boolean' : '';
      error = isClientValid;
    break;

    case 'dataNascimento': 
      const hoje = new Date();
      const dataNascimento = new Date(value);

      if(dataNascimento.getFullYear() > hoje.getFullYear()) {
        error = 'Data de Nascimento é inválido!'
      } else if(dataNascimento.getFullYear() === hoje.getFullYear()) {
        if((dataNascimento.getMonth() + 1) <= (hoje.getMonth() + 1)) {

          if(dataNascimento.getDate() > hoje.getDate()) {
            error = 'Data de Nascimento é inválido!' 
          }
          
        } else {
          error = 'Data de Nascimento é inválido!'
        }
      }
  }

  return error;
}


function PessoaUseCase(data) {
  let error = '';
  for(let index = 0; index < data.length; index++) {
    const response = ValidatorPessoa(data[index].key, data[index].value);
    if(response !== '') {
      error = response;
      break;
    };

  }

  return error;
}

module.exports = PessoaUseCase;