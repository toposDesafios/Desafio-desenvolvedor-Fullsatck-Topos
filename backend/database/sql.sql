CREATE TABLE Funcionario (
  cod_funcionario integer not null primary key autoincrement,
  nome varchar(255) not null,
  data_nascimento DATE not null,
  num_rg varchar(255) not null,
  num_cpf varchar(255) not null,
  nome_mae varchar(255) not null
)

CREATE TABLE Dependente (
  cod_dependente integer not null primary key autoincrement,
  cod_funcionario integer not null,
  nome varchar(255) not null,
  data_nascimento DATE not null,
  num_rg varchar(255) not null,
  num_cpf varchar(255) not null,
  nome_mae varchar(255) not null,
  foreign key (cod_funcionario) references Funcionario(cod_funcionario)
)