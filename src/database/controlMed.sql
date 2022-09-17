
CREATE TABLE IF NOT EXISTS Parceiro (
    id varchar not null,
    cnpj varchar(14) not null,
    razao_social varchar(80) not null,
    nome_fantasia varchar(80) not null,
    inscricao_estadual varchar(9) not null,
    nome_responsavel varchar(80) not null,
    PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS Endereco (
    id varchar not null,
    cep varchar(8) not null,
    logradouro varchar(80) not null,
    complemento varchar(80) null,
    bairro varchar(80) not null,
    cidade varchar(80) not null,
    numero varchar(5) not null,
    uf varchar(2) not null, 

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Produto (
    id varchar not null,
    nome varchar(80) not null,
    continuo boolean not null,
    qtd_comprimidos int null, 
    NCM varchar(8) null,
    preco decimal not null,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Pessoa (
    id  varchar not null,
    cpf varchar(11) not null,
    nome_completo varchar(80) not null, 
    telefone varchar(11) not null,
    email varchar(256) not null,
    data_nascimento date not null,
    sexo varchar(1) not null,
    cliente boolean not null,

    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Usuario (
    id varchar not null,
    senha varchar(8) not null,
    administrador boolean not null,
    farmaceutico boolean not null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Consulta (
    id varchar not null,
    data_consulta timestamp not null,
    preco decimal not null,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Parceiro_Endereco (
    id varchar not null,
    id_endereco varchar not null,
    id_parceiro varchar not null,
    PRIMARY KEY (id),

    CONSTRAINT FK_Endereco_Parceiro FOREIGN KEY (id_endereco) REFERENCES Endereco(id),
    CONSTRAINT FK_Parceiro_Endereco FOREIGN KEY (id_parceiro) REFERENCES Parceiro(id)
);

CREATE TABLE IF NOT EXISTS Produto_Parceiro (
    id varchar not null,
    id_produto varchar not null,
    id_parceiro varchar not null,
    CONSTRAINT FK_Produto_Parceiro FOREIGN KEY (id_produto) REFERENCES Produto(id),
    CONSTRAINT FK_Parceiro_Produto FOREIGN KEY (id_parceiro) REFERENCES Produto(id)
);

CREATE TABLE IF NOT EXISTS Parceiro_Pessoa (
    id varchar not null,
    id_parceiro varchar not null,
    id_pessoa varchar not null,

    CONSTRAINT FK_Parceiro_Pessoa FOREIGN KEY (id_parceiro) REFERENCES Parceiro(id),
    CONSTRAINT FK_Pessoa_Parceiro FOREIGN KEY (id_pessoa) REFERENCES Pessoa(id)
);

CREATE TABLE IF NOT EXISTS Pessoa_Usuario (
    id varchar not null,
    id_usuario varchar not null,
    id_pessoa varchar not null,

    CONSTRAINT FK_Pessoa_Usuario FOREIGN KEY (id_pessoa) REFERENCES Pessoa(id),
    CONSTRAINT FK_Usuario_Pessoa FOREIGN KEY (id_usuario) REFERENCES Usuario(id)
);


CREATE TABLE IF NOT EXISTS Cliente_Consulta_Farmaceutico (
    id varchar not null,
    id_consulta varchar not null,
    id_cliente varchar not null,
    id_farmaceutico varchar not null,

    CONSTRAINT FK_Consulta_Cliente_Farmaceutico FOREIGN KEY (id_consulta) REFERENCES Consulta(id),
    CONSTRAINT FK_Cliente_Consulta_Farmaceutico FOREIGN KEY (id_cliente) REFERENCES Pessoa(id),
    CONSTRAINT FK_Farmaceutico_Cliente_Consulta FOREIGN KEY (id_farmaceutico) REFERENCES Usuario(id)
);

CREATE TABLE IF NOT EXISTS Cliente_Endereco (
    id varchar not null,
    id_endereco varchar not null,
    id_cliente varchar not null,

    CONSTRAINT FK_Endereco_Cliente FOREIGN KEY (id_endereco) REFERENCES Endereco(id),

    CONSTRAINT FK_Cliente_Endereco FOREIGN KEY (id_cliente) REFERENCES Pessoa(id)
)